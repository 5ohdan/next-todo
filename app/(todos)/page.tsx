import { prisma } from '@/lib/helpers';
import { TodoItem } from './TodoItem';

export default async function Page() {
  const todos = await prisma.todo.findMany();
  console.log(todos);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
}
