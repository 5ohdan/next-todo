import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/helpers";
import { getAuth } from "@clerk/nextjs/dist/types/server/getAuth";

interface PatchBody {
  active?: boolean;
  done?: boolean;
  id: number;
}

export async function PATCH(req: NextRequest) {
  const { userId } = getAuth(req);
  const body = (await req.json()) as PatchBody;

  if (userId) {
    await prisma.todo.update({
      where: {
        id: body.id,
      },
      data: {
        done: body.done,
      },
    });
    return new NextResponse("done", {
      status: 200,
    });
  }
  return new NextResponse("something went wrong", {
    status: 500,
  });
}

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

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);
  const body = await req.json();
  console.log(body);
  if (userId) {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: (await body).id as number,
      },
    });
    return new NextResponse(`deleted todo: ${deletedTodo.title}`, {
      status: 200,
    });
  }
  return new NextResponse("something went wrong", {
    status: 500,
  });
}
