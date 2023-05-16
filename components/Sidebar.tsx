import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="flex w-48 flex-col gap-8">
      <Link href={"/inbox"}>
        <h1 className="text-4xl font-bold">ToDay</h1>
      </Link>
      <div className="flex flex-col">
        <Link href={"/inbox"} className="max-w-max">
          <button className="flex w-full min-w-full gap-3 rounded p-2 hover:bg-slate-200">
            <span>📥</span>
            <span>Inbox</span>
          </button>
        </Link>
        <Link href={"/"} className="max-w-max">
          <button
            disabled
            className="flex w-full min-w-full cursor-not-allowed gap-3 rounded p-2 hover:bg-slate-200"
          >
            <span>⭐️</span>
            <span>Today</span>
          </button>
        </Link>
        <Link href={"/"} className="max-w-max">
          <button
            disabled
            className="flex w-full min-w-full cursor-not-allowed gap-3 rounded p-2 hover:bg-slate-200"
          >
            <span>🗓️</span>
            <span>Upcoming</span>
          </button>
        </Link>
        <Link href={"/"} className="max-w-max">
          <button
            disabled
            className="flex w-full min-w-full cursor-not-allowed gap-3 rounded p-2 hover:bg-slate-200"
          >
            <span>📦</span>
            <span>Anytime</span>
          </button>
        </Link>
        <Link href={"/logbook"} className="max-w-max pt-4">
          <button className="flex w-full min-w-full gap-3 rounded p-2 hover:bg-slate-200">
            <span>📔</span>
            <span>Logbook</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
