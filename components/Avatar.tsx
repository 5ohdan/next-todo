"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

export const Avatar = () => {
  const { isLoaded } = useUser();

  return (
    <SignedIn>
      {isLoaded ? (
        <UserButton />
      ) : (
        <Skeleton className="h-9 w-9 rounded-full" />
      )}
    </SignedIn>
  );
};
