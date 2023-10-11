-- CreateTable
CREATE TABLE "ReviewAndRating" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "ReviewAndRating_pkey" PRIMARY KEY ("id")
);
