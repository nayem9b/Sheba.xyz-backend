-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('available', 'upcoming');

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "status" "ServiceStatus" NOT NULL DEFAULT 'available';
