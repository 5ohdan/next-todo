import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/helpers";
import { getAuth } from "@clerk/nextjs/dist/server-helpers.server";

interface PatchBody {
  done: boolean;
  id: number;
}

export async function PATCH(req: NextRequest) {
  const { userId } = getAuth(req);
  const body = (await req.json()) as Promise<PatchBody>;
  console.log(body);

  if (userId) {
    await prisma.todo.update({
      where: {
        id: (await body).id,
      },
      data: {
        done: (await body).done,
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
