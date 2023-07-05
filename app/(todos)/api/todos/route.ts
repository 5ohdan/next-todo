import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

interface PatchBody {
  active?: boolean;
  done?: boolean;
  id: number;
}

export async function GET() {
  const { userId } = auth();
  const todos = await prisma.todo.findMany({
    where: {
      authorId: userId!,
    },
  });
  return NextResponse.json(todos, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  const { userId } = auth();
  const body = (await req.json()) as PatchBody;

  if (!userId)
    return NextResponse.json("Unauthorized", {
      status: 401,
    });

  if (userId) {
    if (body.done !== undefined) {
      await prisma.todo.update({
        where: {
          id: body.id,
        },
        data: {
          done: body.done,
        },
      });
      return NextResponse.json("done", {
        status: 200,
      });
    }
    if (body.active !== undefined) {
      await prisma.todo.update({
        where: {
          id: body.id,
        },
        data: {
          active: body.active,
        },
      });
      return NextResponse.json("done", {
        status: 200,
      });
    }
  }
  return NextResponse.json("something went wrong", {
    status: 500,
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { userId } = auth();
  if (!userId)
    return NextResponse.json("Unauthorized", {
      status: 401,
    });
  if (userId) {
    await prisma.todo.create({
      data: {
        title: await req.json(),
        authorId: userId,
        done: false,
      },
    });
    return NextResponse.json("done", {
      status: 200,
    });
  }
  return NextResponse.json("something went wrong!", {
    status: 500,
  });
}

export async function DELETE(req: NextRequest) {
  const { userId } = auth();
  const body = await req.json();

  if (!userId)
    return NextResponse.json("Unauthorized", {
      status: 401,
    });

  if (userId) {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: (await body).id as number,
      },
    });
    return NextResponse.json(`deleted todo: ${deletedTodo.title}`, {
      status: 200,
    });
  }
  return NextResponse.json("something went wrong", {
    status: 500,
  });
}
