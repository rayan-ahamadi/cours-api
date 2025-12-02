/*
  Warnings:

  - You are about to drop the column `imdbId` on the `Title` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imdbID]` on the table `Title` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imdbID` to the `Title` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Title_imdbId_key";

-- AlterTable
ALTER TABLE "Title" DROP COLUMN "imdbId",
ADD COLUMN     "imdbID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Title_imdbID_key" ON "Title"("imdbID");
