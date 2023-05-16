"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@prisma/client";
import { cn } from "@/lib/utils";

export const TodoItem = ({ ...todo }: Todo) => {
  const { done } = todo;
  const [isChecked, setIsChecked] = useState(done);
  return (
    <li className="flex items-center gap-2">
      <Checkbox
        checked={done}
        onChange={() => {
          console.log(isChecked);
          setIsChecked((prev) => !prev);
        }}
      />
      <p className={cn({ "line-through": done })}>{todo.title}</p>
    </li>
  );
};
