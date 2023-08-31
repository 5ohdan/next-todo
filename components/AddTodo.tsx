"use client"

import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { FormEvent, useState } from "react"
import { useToast } from "./ui/use-toast"
import { Toaster } from "./ui/toaster"
import { useStore } from "@/lib/store"
import { DatePickerMemoized } from "./DatePicker"
import { Button } from "./ui/button"
import { type Todo } from "@prisma/client"
import { compareAsc } from "date-fns"

export const AddTodo = () => {
  const setTodos = useStore((state) => state.setTodos)
  const addTodo = useStore((state) => state.addTodo)

  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const [titleValue, setTitleValue] = useState("")
  const [dueDate, setDueDate] = useState<Todo["dueDate"]>(null)
  const [deadlineDate, setDeadlineDate] = useState<Todo["deadlineDate"]>(null)

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    if (titleValue.trim().length === 0) {
      toast({ title: "Title can not be empty" })
      return
    }
    if (dueDate && deadlineDate && compareAsc(dueDate, deadlineDate)) {
      toast({ title: "Deadline can not be after due date" })
      return
    }
    addTodo(titleValue.trim(), dueDate, deadlineDate).then(() => {
      toast({ title: `Added todo: ${titleValue}` })
    })
    setOpen(false)
    setTitleValue("")
    setDueDate(null)
    setDeadlineDate(null)
    setTodos()
  }

  return (
    <div className="sticky bottom-7">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-4xl text-white hover:bg-blue-600 hover:outline-blue-700">
          <Plus width={24} height={24} />
        </DialogTrigger>
        <DialogContent className="p-4">
          <form onSubmit={submitHandler} className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Add todo</h2>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Input a task to do"
              value={titleValue}
              onChange={(event) => setTitleValue(event.target.value)}
            />
            <DatePickerMemoized placeholder="Due date" setDate={setDueDate} />
            <DatePickerMemoized
              placeholder="Deadline"
              setDate={setDeadlineDate}
            />
            <Button>Create todo</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}
