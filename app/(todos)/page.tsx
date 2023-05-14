import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { userId } = auth();
  if (!userId) redirect('/sign-in');
  redirect('/inbox');
}
