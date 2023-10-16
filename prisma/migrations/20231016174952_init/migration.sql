/*
  Warnings:

  - You are about to drop the column `age` on the `booking` table. All the data in the column will be lost.
  - Added the required column `contactNo` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "age",
ADD COLUMN     "contactNo" INTEGER NOT NULL;
