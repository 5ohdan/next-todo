import { TodoList } from "@/components/TodoList";

export default async function Page() {
  return <TodoList title={"Logbook"} completed={true} />;
}
