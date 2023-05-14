import Link from 'next/link';

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-8 w-48">
      <Link href={'/inbox'}>
        <h1 className="font-bold text-4xl">ToDay</h1>
      </Link>
      <div className="flex flex-col">
        <Link href={'/inbox'} className="max-w-max">
          <button className="flex gap-3 min-w-full p-2 hover:bg-slate-200 rounded w-full">
            <span>📥</span>
            <span>Inbox</span>
          </button>
        </Link>
        <Link href={'/'} className="max-w-max">
          <button
            disabled
            className="flex gap-3 min-w-full p-2 hover:bg-slate-200 rounded w-full cursor-not-allowed"
          >
            <span>⭐️</span>
            <span>Today</span>
          </button>
        </Link>
        <Link href={'/'} className="max-w-max">
          <button
            disabled
            className="flex gap-3 min-w-full p-2 hover:bg-slate-200 rounded w-full cursor-not-allowed"
          >
            <span>🗓️</span>
            <span>Upcoming</span>
          </button>
        </Link>
        <Link href={'/'} className="max-w-max">
          <button
            disabled
            className="flex gap-3 min-w-full p-2 hover:bg-slate-200 rounded w-full cursor-not-allowed"
          >
            <span>📦</span>
            <span>Anytime</span>
          </button>
        </Link>
        <Link href={'/logbook'} className="max-w-max pt-4">
          <button className="flex gap-3 min-w-full p-2 hover:bg-slate-200 rounded w-full">
            <span>📔</span>
            <span>Logbook</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
