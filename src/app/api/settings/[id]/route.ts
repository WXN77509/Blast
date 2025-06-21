// /app/api/settings/[id]/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const items = [
  {
    title: "Request confirmation before deleting",
    state: "Desactivated",
    shortCut: "⇧⌘P"
  },
  {
    title: "Add new tasks at the top",
    state: "Activated",
    shortCut: "⌘+B"
  },
  {
    title: "Move starred tasks upwards",
    state: "Activated",
    shortCut: "⌘A"
  },
  {
    title: "Read the audible completion alert",
    state: "Activated",
    shortCut: "⇧⌘C"
  },
  {
    title: "Display contextual menus",
    state: "Activated",
    shortCut: "⌘X"
  },
  {
    title: "Activate reminder notifications",
    state: "Activated",
    shortCut: "⌘+L"
  }
];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    // Vérifier que l'utilisateur existe
    const userExists = await prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userSettings = await prisma.setting.findMany({
      where: { userId: id }
    });

    if (userSettings.length === 0) {
      // Créer les paramètres par défaut
      await prisma.setting.createMany({
        data: items.map((setting) => ({
          ...setting,
          userId: id
        }))
      });

      const newUserSettings = await prisma.setting.findMany({
        where: { userId: id }
      });

      return NextResponse.json({ userSettings: newUserSettings });
    }

    return NextResponse.json({ userSettings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    // Vérifier que l'utilisateur existe
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const settings = await req.json();

    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: "Expected an array of settings" },
        { status: 400 }
      );
    }

    const createdSettings = await prisma.setting.createMany({
      data: settings.map((setting) => ({
        ...setting,
        userId
      }))
    });

    return NextResponse.json({ createdCount: createdSettings.count });
  } catch (error) {
    console.error("Error creating settings:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    const { settingId, data } = await req.json();

    if (!settingId || !data || typeof settingId !== "string") {
      return NextResponse.json(
        { error: "Invalid request. 'settingId' and 'data' are required." },
        { status: 400 }
      );
    }

    const updatedSetting = await prisma.setting.updateMany({
      where: {
        id: settingId,
        userId: userId
      },
      data: data
    });

    if (updatedSetting.count === 0) {
      return NextResponse.json(
        { error: "Setting not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating setting:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
