// /app/api/merge-guest/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  const session = await getSession();
  const currentUser = session?.user;

  if (!currentUser?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { guestUserId } = await req.json();

  if (!guestUserId) {
    return NextResponse.json(
      { error: "guestUserId is required" },
      { status: 400 }
    );
  }

  // Vérifie que le guest existe
  const guest = await prisma.user.findUnique({
    where: { id: guestUserId },
    include: { taskLists: true, settings: true }
  });

  if (!guest || !guest.isGuest) {
    return NextResponse.json({ error: "Invalid guest user" }, { status: 400 });
  }

  // Fusionne les TaskList
  await prisma.taskList.updateMany({
    where: { userId: guestUserId },
    data: { userId: currentUser.id }
  });

  // Fusionne les Settings
  await prisma.setting.updateMany({
    where: {
      userId: guestUserId // ✅ Champ direct, fonctionne dans updateMany
    },
    data: {
      userId: currentUser.id
    }
  });

  await prisma.user.delete({ where: { id: guestUserId } });
  return NextResponse.json({ message: "Guest data merged successfully" });
}
