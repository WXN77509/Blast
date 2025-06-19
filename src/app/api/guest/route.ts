// /app/api/guest/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import guestUserIcon from "@/icons/user-plus.svg";

export async function POST() {
  try {
    const guestUser = await prisma.user.create({
      data: {
        isGuest: true,
        name: "Guest",
        image: guestUserIcon,
        emailVerified: false
      }
    });

    return NextResponse.json({ guestUserId: guestUser.id });
  } catch (error) {
    console.error("Error creating guest user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
