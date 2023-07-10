"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export const ToEditTodo = ({
  id,
  title,
  done,
}: {
  id: number;
  title: string;
  done: boolean;
}) => {
  const setTodos = useStore((state) => state.setTodos);

  const [editValue, setEditValue] = useState(title);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <p className={cn({ "line-through": done })}>{title}</p>
      </DialogTrigger>
      <DialogContent>
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
        <Button
          onClick={() => {
            if (editValue.length === 0) return;
            if (editValue === title) {
              setIsOpen(false);
              return;
            }
            fetch("inbox/todo/api", {
              method: "PATCH",
              body: JSON.stringify({ id: id, title: editValue }),
            })
              .then(() => {
                setIsOpen(false);
                setTodos();
              })
              .catch((error) => {
                console.log(error);
                setIsOpen(false);
                setEditValue(title);
                throw new Error(error);
              });
          }}
        >
          Save
        </Button>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
};
