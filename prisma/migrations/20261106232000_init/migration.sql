-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MECHANIC', 'CLIENT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mechanic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,
    "specialty" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Mechanic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOrder" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "mechanicId" INTEGER,
    "description" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "ServiceOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mechanic_userId_key" ON "Mechanic"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Mechanic_email_key" ON "Mechanic"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOrder_vehicleId_key" ON "ServiceOrder"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOrder_mechanicId_key" ON "ServiceOrder"("mechanicId");

-- AddForeignKey
ALTER TABLE "Mechanic" ADD CONSTRAINT "Mechanic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOrder" ADD CONSTRAINT "ServiceOrder_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOrder" ADD CONSTRAINT "ServiceOrder_mechanicId_fkey" FOREIGN KEY ("mechanicId") REFERENCES "Mechanic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
