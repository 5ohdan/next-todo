import Link from "next/link";
import { MenuLink } from "./MenuLink";

export const Sidebar = () => {
  return (
    <div className="flex w-48 flex-col gap-8">
      <Link href={"/inbox"}>
        <h1 className="text-4xl font-bold">ToDay</h1>
      </Link>
      <div className="flex flex-col">
        <MenuLink href={"/"} icon={"📥"} title="Inbox" />
        <MenuLink href={"/"} icon={"⭐️"} title="Today" disabled={true} />
        <MenuLink href={"/"} icon={"🗓️"} title="Upcoming" disabled={true} />
        <MenuLink href={"/"} icon={"📦"} title="Anytime" disabled={true} />
        <MenuLink
          href={"/logbook"}
          icon={"📔"}
          title="Logbook"
          className="pt-4"
        />
      </div>
    </div>
  );
};
