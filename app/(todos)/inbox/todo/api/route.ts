import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

interface PatchProps {
  id: number;
  title?: string;
  description?: string;
}

export async function PATCH(req: NextRequest) {
  const { userId } = auth();
  const body = await req.json()
  console.log(body)
  const { id, title, description } = body

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
          description: description,
        },
      });
      return NextResponse.json("Title updated", {
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json(`Something went wrong, ${error}`, {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  const { userId } = auth();
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!userId) {
    return NextResponse.json("Unauthorized", {
      status: 403,
    });
  }

  if (id !== undefined && id !== null) {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      {
        id: todo?.id,
        description: todo?.description,
        title: todo?.title,
      },
      {
        status: 200,
      }
    );
  }
  return NextResponse.json("Something went wrong", {
    status: 500,
  });
}
