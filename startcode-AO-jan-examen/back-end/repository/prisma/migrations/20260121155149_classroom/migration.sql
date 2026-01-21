-- CreateTable
CREATE TABLE "Classroom" (
    "id" SERIAL NOT NULL,
    "className" TEXT NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_className_key" ON "Classroom"("className");
