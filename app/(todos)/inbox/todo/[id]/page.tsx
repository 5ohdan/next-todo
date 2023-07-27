import { notFound, redirect } from "next/navigation";

import { Editor } from "@/components/Editor";
import { Todo } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

const getTodoById = async (postId: Todo["id"], userId: Todo["authorId"]) => {
  return await prisma.todo.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
};

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function TodoEditorPage({ params }: PostPageProps) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const todo = await getTodoById(Number(params.id), userId);

  if (!todo) notFound();

  return (
    <Editor
      todo={{
        id: todo.id,
        title: todo.title,
        description: todo.description,
      }}
    />
  );
}
