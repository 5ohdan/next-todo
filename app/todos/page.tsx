import { Suspense } from 'react';

async function getTodos() {
  const data = await fetch('http://localhost:3000/api/todos');
  const todos = await data.json();
  return todos;
}

export default async function Page() {
  const todos = await getTodos();
  console.log({ todos });

  return (
    <Suspense>
      <h1>{1}</h1>
    </Suspense>
  );
}

{
  /* // <ul>{todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}</ul> */
}
