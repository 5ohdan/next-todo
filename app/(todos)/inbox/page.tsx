import { prisma } from "@/lib/helpers";
import { TodoItem } from "../TodoItem";
import { auth } from "@clerk/nextjs";

export default async function Page() {
  const { userId } = auth();

  const todos = await prisma.todo.findMany({
    where: {
      done: false,
      authorId: userId!,
    },
  });

  return (
    <div className="flex flex-col gap-10">
      <h1 className="pt-4 text-xl font-semibold">Inbox</h1>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      ) : (
        <p>You have no active todos.</p>
      )}
    </div>
  );
}
