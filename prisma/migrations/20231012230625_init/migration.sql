-- CreateEnum
CREATE TYPE "Location" AS ENUM ('Dhaka', 'Rangpur', 'Rajshahi', 'Khulna', 'Barishal', 'Chittagong', 'Chattagram', 'Sylhet', 'Mymensingh');

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'Dhaka';
