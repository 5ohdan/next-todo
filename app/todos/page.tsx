import { PrismaClient } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';

const prisma = new PrismaClient();

export default async function Page() {
  const todos = await prisma.todo.findMany({});

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="flex gap-2 items-center">
          <Checkbox />
          <p>{todo.title}</p>
        </li>
      ))}
    </ul>
  );
}
