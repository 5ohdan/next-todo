"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@prisma/client";
import { cn } from "@/lib/utils";

export const TodoItem = ({ ...todo }: Todo) => {
  const { done, id } = todo;
  const [isChecked, setIsChecked] = useState(done);
  return (
    <li className="flex items-center gap-2">
      <Checkbox
        checked={isChecked}
        onCheckedChange={() => {
          setIsChecked((prev) => !prev);
          fetch("/api/todos", {
            method: "PATCH",
            body: JSON.stringify({
              done: !isChecked,
              id,
            }),
          });
        }}
      />
      <p className={cn({ "line-through": done })}>{todo.title}</p>
    </li>
  );
};
