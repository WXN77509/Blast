/*
  Warnings:

  - You are about to drop the column `settingsId` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_settingsId_fkey";

-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "settingsId";

-- DropTable
DROP TABLE "Settings";
