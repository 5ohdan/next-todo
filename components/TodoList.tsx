"use client";

import { useEffect, useMemo } from "react";
import { TodoItem } from "./TodoItem";
import { type Todo } from "@prisma/client";
import { useStore } from "@/lib/store";

export const TodoList = ({ completed }: { completed: boolean }) => {
  const todos = useStore((state) => state.todos);
  const setTodos = useStore((state) => state.setTodos);

  useEffect(() => {
    setTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => todo.done === completed && todo.active);
  }, [todos]);

  return (
    <>
      {filteredTodos.length > 0 ? (
        <ul>
          {filteredTodos.map((todo: Todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      ) : (
        <p>You have no active todos.</p>
      )}
    </>
  );
};
