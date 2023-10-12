-- CreateTable
CREATE TABLE "myCart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "servicesId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "myCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "myCart" ADD CONSTRAINT "myCart_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
