import { prisma } from "./prisma";

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
  },
  {
    title: "Activate reminder notifications",
    state: "Desactivated",
    shortCut: "⇧⌘V"
  }
];

async function initializeSettings() {
  try {
    await prisma.setting.createMany({ data: items });
    console.log("Settings initialized successfully.");
  } catch (error) {
    console.error((error as Error).message || "Unknown error");
  }
}

initializeSettings();
