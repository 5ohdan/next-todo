import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  console.log({ req });
  const todos = await prisma.todo.findMany();

  return NextResponse.json(todos);
}
