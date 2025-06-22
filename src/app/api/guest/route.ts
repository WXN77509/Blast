// /app/api/guest/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

let countGuest = 0;

export async function POST() {
  try {
    const guestUser = await prisma.user.create({
      data: {
        isGuest: true,
        name: "Guest",
        email: `guest${countGuest}@guestUser.com`,
        emailVerified: false
      }
    });

    countGuest += 1;

    return NextResponse.json({ guestUserId: guestUser.id });
  } catch (error) {
    console.error("Error creating guest user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
