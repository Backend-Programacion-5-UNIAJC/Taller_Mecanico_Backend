import { prisma } from '../lib/prisma';
import { AppError } from '../errors/app-error';

export async function listMechanics() {
  return prisma.mechanic.findMany({
    orderBy: { id: 'asc' },
  });
}

export async function findMechanicById(id: number) {
  const mechanic = await prisma.mechanic.findUnique({
    where: { id },
    include: { serviceOrders: true },
  });

  if (!mechanic) {
    throw new AppError(404, 'Mecanico no encontrado', 'MECHANIC_NOT_FOUND');
  }

  return mechanic;
}

export async function createMechanic(data: {
  name: string;
  specialty: string;
  email: string;
  userId?: number | null;
}) {
  return prisma.mechanic.create({
    data,
  });
}

export async function updateMechanic(
  id: number,
  data: Partial<{ name: string; specialty: string; email: string; userId?: number | null }>
) {
  await findMechanicById(id);

  return prisma.mechanic.update({
    where: { id },
    data,
  });
}

export async function deleteMechanic(id: number): Promise<void> {
  await findMechanicById(id);

  await prisma.mechanic.delete({
    where: { id },
  });
}