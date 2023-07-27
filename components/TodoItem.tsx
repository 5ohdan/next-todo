"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import type { Todo } from "@prisma/client";
import { useStore } from "@/lib/store";
import { ToEditTodo } from "./ToEditTodo";

export const TodoItem = ({ ...todo }: Todo) => {
  const { title, done, id } = todo;
  const [isChecked, setIsChecked] = useState(done);

  const setTodos = useStore((state) => state.setTodos);

  const checkedTodo = () => {
    fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({
        done: !isChecked,
        id,
      }),
    })
      .then(() => {
        setTodos();
      })
      .catch((error) => {
        console.log(error);
        throw new Error("something went wrong with setting todo done");
      });
  };

  const onDelete = () => {
    fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({
        active: false,
        id,
      }),
    })
      .then(() => setTodos())
      .catch((error) => {
        console.log(error);
        throw new Error("something went wrong with deleting todo");
      });
  };

  const IdleTodoItem = (
    <li className="flex justify-between pb-1">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => {
            checkedTodo();
            setIsChecked((prev) => !prev);
          }}
        />
        <ToEditTodo id={id} title={title} done={done} />
      </div>
      <Button variant="ghost" onClick={onDelete}>
        <Trash width={15} height={15} />
      </Button>
    </li>
  );

  return IdleTodoItem;
};
