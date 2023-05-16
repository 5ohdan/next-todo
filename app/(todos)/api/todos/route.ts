import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/dist/server-helpers.server";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {}

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId } = getAuth(req);
  if (userId) {
    await prisma.todo.create({
      data: {
        title: await req.json(),
        authorId: userId,
        done: false,
      },
    });
    return new NextResponse("done", {
      status: 200,
    });
  }
  return new NextResponse("something went wrong!", {
    status: 500,
  });
}
