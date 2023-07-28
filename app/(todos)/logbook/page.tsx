import { TodoList } from "@/components/TodoList";

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <h1 className="pt-4 text-xl font-semibold">Logbook</h1>
      <TodoList completed={true} />
    </div>
  );
}
