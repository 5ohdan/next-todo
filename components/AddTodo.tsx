"use client";

import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FormEvent, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useStore } from "@/lib/store";

export const AddTodo = () => {
  const setTodos = useStore((state) => state.setTodos);
  const { toast } = useToast();

  const [todoValue, setTodoValue] = useState("");
  const [open, setOpen] = useState(false);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (todoValue.trim().length === 0) return;
    fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todoValue),
    }).then(() => {
      toast({ title: `Added todo: ${todoValue}` });
    });
    setOpen(false);
    setTodoValue("");
    setTodos();
  };

  return (
    <div className="sticky bottom-7">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-4xl text-white hover:bg-blue-600 hover:outline-blue-700">
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
      <Toaster />
    </div>
  );
};
