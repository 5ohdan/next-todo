'use client';

import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { Skeleton } from './ui/skeleton';

export const Avatar = () => {
  const { isLoaded } = useUser();

  return (
    <SignedIn>
      {isLoaded ? (
        <UserButton />
      ) : (
        <Skeleton className="w-9 h-9 rounded-full" />
      )}
    </SignedIn>
  );
};
