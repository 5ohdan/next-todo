"use client";

import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

import type { Todo } from "@prisma/client";
import { useStore } from "@/lib/store";
import { Input } from "./ui/input";

export const TodoItem = ({ ...todo }: Todo) => {
  const { done, id } = todo;
  const [editValue, setEditValue] = useState(todo.title);
  const [isChecked, setIsChecked] = useState(done);
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const setTodos = useStore((state) => state.setTodos);

  const checkedTodo = () => {
    fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({
        done: !isChecked,
        id,
      }),
    })
      .then((result) => {
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
    <li className="flex justify-between py-1">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => {
            checkedTodo();
            setIsChecked((prev) => !prev);
          }}
        />
        <p
          className={cn({ "line-through": done })}
          onClick={() => setIsEditing(true)}
        >
          {todo.title}
        </p>
      </div>
      <Button variant="ghost" onClick={onDelete}>
        <Trash width={18} height={18} />
      </Button>
    </li>
  );

  const EditingTodoItem = (
    <li className="flex justify-between py-1">
      <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
      <Button
        onClick={() => {
          if (editValue.length === 0) return;
          if (editValue === todo.title) {
            setIsEditing(false);
            return;
          }
          fetch("inbox/todo/api", {
            method: "PATCH",
            body: JSON.stringify({ id: todo.id, title: editValue }),
          })
            .then(() => {
              setIsEditing(false);
              setTodos();
            })
            .catch((error) => {
              console.log(error);
              setIsEditing(false);
              setEditValue(todo.title);
              throw new Error(error);
            });
        }}
      >
        Save
      </Button>
      <Button
        onClick={() => {
          setIsEditing(false);
          setEditValue(todo.title);
        }}
      >
        Cancel
      </Button>
    </li>
  );

  return !isEditing ? IdleTodoItem : EditingTodoItem;
};
