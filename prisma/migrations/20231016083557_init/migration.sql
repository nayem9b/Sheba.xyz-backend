/*
  Warnings:

  - Added the required column `time` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
