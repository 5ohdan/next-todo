"use client";

import { useEffect, useMemo } from "react";
import { TodoItem } from "./TodoItem";
import { type Todo } from "@prisma/client";
import { useStore } from "@/lib/store";

export const TodoList = ({
  title,
  completed,
}: {
  title: string;
  completed: boolean;
}) => {
  const todos = useStore((state) => state.todos);
  const setTodos = useStore((state) => state.setTodos);

  useEffect(() => {
    setTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => todo.done === completed);
  }, [todos]);

  return (
    <div className="flex flex-1 flex-col gap-10">
      <h1 className="pt-4 text-xl font-semibold">{title}</h1>
      {filteredTodos.length > 0 ? (
        <ul>
          {filteredTodos.map((todo: Todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      ) : (
        <p>You have no active todos.</p>
      )}
    </div>
  );
};
