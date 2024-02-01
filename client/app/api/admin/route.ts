import { auth } from '@/lib/auth';
import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();

  if (session?.user.roles.includes(Role.ADMIN)) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
