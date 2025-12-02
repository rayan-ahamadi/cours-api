/*
  Warnings:

  - You are about to drop the column `genres` on the `Title` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Title` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Title" DROP COLUMN "genres",
ADD COLUMN     "dataCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "genre" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
