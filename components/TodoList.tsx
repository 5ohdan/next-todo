"use client"

import { useEffect, useMemo } from "react"
import { TodoItem } from "./TodoItem"
import { type Todo } from "@prisma/client"
import { useStore } from "@/lib/store"
import { compareAsc } from "date-fns"

interface TodoListProps {
  completed: boolean
  date?: Date | number | null
}

export const TodoList = ({ completed, date }: TodoListProps) => {
  const todos = useStore((state) => state.todos)
  const setTodos = useStore((state) => state.setTodos)

  useEffect(() => {
    setTodos()
  }, [])

  const filteredTodos = useMemo(() => {
    const activeTodos = todos.filter(
      (todo) => todo.done === completed && todo.active,
    )
    // TODO: remove this *if* logic when understand how to work with dates in mysql
    if (typeof date === "number") {
      return activeTodos.filter(
        (todo) => todo.dueDate && new Date(todo.dueDate).getTime() <= date,
      )
    } else if (date && typeof date === "object") {
      return activeTodos.filter(
        (todo) => todo.dueDate && compareAsc(date, todo.dueDate),
      )
    }
    return activeTodos
  }, [todos])

  return (
    <>
      {filteredTodos.length > 0 ? (
        <ul>
          {filteredTodos.map((todo: Todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      ) : (
        <p>You have no active todos.</p>
      )}
    </>
  )
}
