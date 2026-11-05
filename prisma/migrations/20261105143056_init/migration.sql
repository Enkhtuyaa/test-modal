-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'DROPOUT', 'GRADUATE');

-- CreateEnum
CREATE TYPE "Label" AS ENUM ('CAT', 'NOT_CAT');

-- CreateEnum
CREATE TYPE "Ground" AS ENUM ('training', 'testing');

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "label" "Label",
    "ground" "Ground" NOT NULL DEFAULT 'training',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "photos_storagePath_key" ON "photos"("storagePath");
