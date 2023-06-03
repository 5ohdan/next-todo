import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";

import { IBM_Plex_Sans } from "next/font/google";
import { AddTodo } from "@/components/AddTodo";
import { Avatar } from "@/components/Avatar";

const ibm_plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata = {
  title: "next-todo",
  description: "a todo application build with next13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={ibm_plex.className}>
        <body className="min-h-screen min-w-full">
          <div className="flex min-h-screen justify-between p-8">
            <div className="flex flex-1 gap-24">
              <Sidebar />
              {children}
            </div>
            <div className="flex flex-col justify-between">
              <Avatar />
              <AddTodo />
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
