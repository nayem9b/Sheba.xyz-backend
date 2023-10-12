-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "rating" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewAndRating" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ReviewAndRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
