/*
  Warnings:

  - Added the required column `age` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;
