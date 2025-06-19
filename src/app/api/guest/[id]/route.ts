// /app/api/guest/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const guest = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!guest || !guest.isGuest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    return NextResponse.json({ user: guest });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
