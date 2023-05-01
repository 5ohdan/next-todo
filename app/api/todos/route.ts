import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany({});
  return NextResponse.json(todos);
}
