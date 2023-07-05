import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Todo } from "@prisma/client";

interface TodoState {
  todos: Todo[];
  setTodos: () => void;
}

export const useStore = create<TodoState>()(
  devtools((set) => ({
    todos: [],
    setTodos: async () => {
      const result = await fetch("/api/todos", {
        method: "GET",
      });
      set({ todos: await result.json() });
    },
  }))
);
