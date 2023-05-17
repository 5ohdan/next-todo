"use client";

import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FormEvent, useState } from "react";

export const AddTodo = () => {
  const [todoValue, setTodoValue] = useState("");
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (todoValue.trim().length === 0) return;
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todoValue),
    });
    setTodoValue("");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-4xl text-white">
          <Plus width={24} height={24} />
        </DialogTrigger>
        <DialogContent className="p-4">
          <form onSubmit={submitHandler}>
            <Label htmlFor="todo">Title</Label>
            <Input
              type="text"
              id="todo"
              placeholder="Input a task to do"
              value={todoValue}
              onChange={(event) => setTodoValue(event.target.value)}
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
