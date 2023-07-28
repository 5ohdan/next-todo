import { TodoList } from "@/components/TodoList";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <h1 className="pt-4 text-xl font-semibold">Inbox</h1>
      <Suspense fallback={<span>Loading...</span>}>
        <TodoList completed={false} />
      </Suspense>
    </div>
  );
}
