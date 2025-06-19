/*
  Warnings:

  - You are about to drop the column `password` on the `account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isGuest" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "shortCut" TEXT NOT NULL,
    "settingsId" TEXT,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "Settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
