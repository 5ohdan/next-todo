import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

interface PatchProps {
  id: number;
  title: string;
}

export async function PATCH(req: NextRequest) {
  const { userId } = auth();
  const { id, title } = (await req.json()) as PatchProps;

  if (!userId)
    return NextResponse.json("Unauthorized", {
      status: 401,
    });

  try {
    if (userId) {
      await prisma.todo.update({
        where: {
          id: id,
        },
        data: {
          title: title,
        },
      });
      return NextResponse.json("Title updated", {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json("Something went wrong", {
      status: 500,
    });
  }
}
