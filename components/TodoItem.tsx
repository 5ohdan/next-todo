"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TodoItem = ({ ...todo }: Todo) => {
  const { done, id } = todo;
  const [isChecked, setIsChecked] = useState(done);
  return (
    <li className="flex justify-between py-1">
      <div className="flex items-center gap-2">
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
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          console.log(id);
          fetch("/api/todos", {
            method: "PATCH",
            body: JSON.stringify({
              active: false,
              id,
            }),
          });
          console.log("done");
        }}
      >
        <Trash width={18} height={18} />
      </Button>
    </li>
  );
};
