import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Todo } from "@prisma/client";

interface TodoState {
  todos: Todo[];
  setTodos: () => void;
  addTodo: (
    title: Todo["title"],
    dueDate: Todo["dueDate"],
    deadlineDate: Todo["deadlineDate"]
  ) => Promise<string>;
}

export const useStore = create<TodoState>()(
  devtools((set) => ({
    todos: [],
    setTodos: async () => {
      const response = await fetch("/api/todos");
      if (!response?.ok) {
        throw new Error("Can't get the todos list");
      } else {
        const result = await response.json();
        set({ todos: result });
      }
    },
    addTodo: async (title, dueDate, deadlineDate) => {
      const response = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          dueDate: dueDate,
          deadlineDate: deadlineDate,
        }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        return response.json();
      }
    },
  }))
);
