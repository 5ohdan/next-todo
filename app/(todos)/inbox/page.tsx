import { TodoList } from "@/components/TodoList";

export default async function Page() {
  return <TodoList title={"Inbox"} completed={false} />;
}
