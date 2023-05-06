import './globals.css';
import { ClerkProvider } from '@clerk/nextjs/app-beta';
import SignOut from '@/components/sign-out/SignOut';

export const metadata = {
  title: 'next-todo',
  description: 'a todo application build with next13',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="min-h-screen flex flex-col items-center p-4 w-full">
          <SignOut />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
