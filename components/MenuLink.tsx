import { cn } from "@/lib/utils";
import Link from "next/link";

interface MenuLinkProps {
  href: string;
  disabled: boolean;
  icon: string;
  title: string;
  className?: string;
}

export const MenuLink = ({
  href,
  disabled,
  icon,
  title,
  className,
}: MenuLinkProps) => {
  {
    return !disabled ? (
      <Link href={href} className={cn("max-w-max", className)}>
        <button
          className={cn(
            "flex w-full min-w-full max-w-max gap-3 rounded p-2 hover:bg-slate-200"
          )}
        >
          <span>{icon}</span>
          <span>{title}</span>
        </button>
      </Link>
    ) : (
      <div
        className={cn(
          "flex w-full min-w-full max-w-max gap-3 rounded p-2 hover:bg-slate-200",
          className
        )}
      >
        <span>{icon}</span>
        <span>{title}</span>
      </div>
    );
  }
};
