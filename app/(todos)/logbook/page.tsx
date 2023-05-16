import { prisma } from "@/lib/helpers";
import { TodoItem } from "../TodoItem";
import { auth } from "@clerk/nextjs";

export default async function Page() {
  const { userId } = auth();

  const doneTodos = await prisma.todo.findMany({
    where: {
      done: true,
      authorId: userId!,
    },
  });

  return (
    <div className="flex flex-col gap-10">
      <h1 className="pt-4 text-xl font-semibold">Logbook</h1>
      {doneTodos.length > 0 ? (
        <ul>
          {doneTodos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      ) : (
        <p>You have no done todos</p>
      )}
    </div>
  );
}
