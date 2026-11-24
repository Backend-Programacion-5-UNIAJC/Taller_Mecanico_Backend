import { prisma } from '../lib/prisma';
import { AppError } from '../errors/app-error';

export async function listVehicles() {
  return prisma.vehicle.findMany({
    orderBy: { id: 'asc' },
  });
}

export async function findVehicleById(id: number) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: { serviceOrders: true },
  });

  if (!vehicle) {
    throw new AppError(404, 'Vehiculo no encontrado', 'VEHICLE_NOT_FOUND');
  }

  return vehicle;
}

export async function createVehicle(data: {plate: string;brand: string;model: string;ownerName: string;}) {
  return prisma.vehicle.create({
    data,
  });
}

export async function updateVehicle(id: number,data: Partial<{ plate: string; brand: string; model: string; ownerName: string }>) {
  await findVehicleById(id);

  return prisma.vehicle.update({where: { id },data,});
}

export async function deleteVehicle(id: number): Promise<void> {
  await findVehicleById(id);

  await prisma.vehicle.delete({
    where: { id },
  });
}