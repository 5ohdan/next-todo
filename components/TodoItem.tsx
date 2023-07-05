"use client";

import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

import type { Todo } from "@prisma/client";
import { useStore } from "@/lib/store";

export const TodoItem = ({ ...todo }: Todo) => {
  const { done, id } = todo;
  const [isChecked, setIsChecked] = useState(done);

  const setTodos = useStore((state) => state.setTodos);

  useEffect(() => {
    if (isChecked) {
      const timeoutId = setTimeout(() => {
        fetch("/api/todos", {
          method: "PATCH",
          body: JSON.stringify({
            done: isChecked,
            id,
          }),
        }).catch((error) => {
          console.log(error);
          throw new Error("something went wrong with setting todo done");
        });
        setTodos();
      }, 300);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isChecked]);

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
        throw new Error("something went wrong");
      });
  };

  return (
    <li className="flex justify-between py-1">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => {
            setIsChecked((prev) => !prev);
          }}
        />
        <p className={cn({ "line-through": done })}>{todo.title}</p>
      </div>
      <Button variant="ghost" onClick={onDelete}>
        <Trash width={18} height={18} />
      </Button>
    </li>
  );
};
