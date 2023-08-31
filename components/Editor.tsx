"use client"

import { Button } from "./ui/button"

import { type Todo } from "@prisma/client"
import EditorJS from "@editorjs/editorjs"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useRef, useState } from "react"
import { patchPatchSchema } from "@/lib/validators/patch"
import { toast } from "./ui/use-toast"

interface TodoEditProps {
  todo: Pick<Todo, "id" | "title" | "description">
}

export const Editor = ({ todo }: TodoEditProps) => {
  const { handleSubmit } = useForm<FormData>({
    resolver: zodResolver(patchPatchSchema),
  })
  const ref = useRef<EditorJS>()
  const [titleValue, setTitleValue] = useState<string>(todo.title)
  // const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    // @ts-expect-error
    const Embed = (await import("@editorjs/embed")).default
    // @ts-expect-error
    const List = (await import("@editorjs/list")).default
    // @ts-expect-error
    const Code = (await import("@editorjs/code")).default
    // @ts-expect-error
    const LinkTool = (await import("@editorjs/link")).default
    // @ts-expect-error
    const InlineCode = (await import("@editorjs/inline-code")).default

    const body = patchPatchSchema.parse(todo)

    console.log(body.description)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        inlineToolbar: true,
        data: body.description,
        autofocus: true,
        placeholder: "Write some description",
        tools: {
          header: Header,
          list: List,
          embed: Embed,
          code: Code,
          linkTool: LinkTool,
          inlineCode: InlineCode,
        },
        onReady: () => {
          ref.current = editor
        },
        onChange: (api, event) => console.log({ api, event }),
      }) as EditorJS
    }
  }, [todo])

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  const onSubmit = async () => {
    const blocks = await ref.current?.save()

    if (titleValue.trim().length === 0) {
      toast({ title: "Title can not be empty" })
      return
    }

    const response = await fetch("/inbox/todo/api", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
        description: blocks,
        title: titleValue.trim(),
      }),
    })
    if (!response?.ok) {
      return toast({
        title: "Something went wrong",
        description: "Todo changes were not saved",
        variant: "destructive",
      })
    } else {
      return toast({
        title: "Changes have been saved successfully",
      })
    }
  }

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full justify-center"
      >
        <div className="prose prose-stone flex h-full w-full flex-col">
          <TextareaAutosize
            id="title"
            value={titleValue}
            onChange={(event) => setTitleValue(event.target.value)}
            placeholder="Todo title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="h-full w-full"></div>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  )
}
