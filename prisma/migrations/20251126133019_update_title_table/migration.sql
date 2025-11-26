/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the column `voteCount` on the `Title` table. All the data in the column will be lost.
  - Added the required column `actors` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `awards` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boxOffice` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dvd` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalRatings` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imdbVotes` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metascore` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plot` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `production` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rated` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `released` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writer` to the `Title` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Title` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Title" DROP COLUMN "averageRating",
DROP COLUMN "externalId",
DROP COLUMN "name",
DROP COLUMN "releaseYear",
DROP COLUMN "voteCount",
ADD COLUMN     "actors" TEXT NOT NULL,
ADD COLUMN     "awards" TEXT NOT NULL,
ADD COLUMN     "boxOffice" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "dvd" TEXT NOT NULL,
ADD COLUMN     "externalRatings" JSONB NOT NULL,
ADD COLUMN     "imdbRating" DOUBLE PRECISION,
ADD COLUMN     "imdbVotes" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "metascore" TEXT NOT NULL,
ADD COLUMN     "plot" TEXT NOT NULL,
ADD COLUMN     "poster" TEXT NOT NULL,
ADD COLUMN     "production" TEXT NOT NULL,
ADD COLUMN     "rated" TEXT NOT NULL,
ADD COLUMN     "released" TEXT NOT NULL,
ADD COLUMN     "response" TEXT NOT NULL,
ADD COLUMN     "runtime" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL,
ADD COLUMN     "writer" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
