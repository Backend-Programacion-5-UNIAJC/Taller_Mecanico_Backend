import { prisma } from "../lib/prisma";

export async function listVehicles() {
    return prisma.vehicle.findMany({
        orderBy: { id: "asc" }
    });
}

export async function findVehicleById(id: number) {
    return prisma.vehicle.findUnique({
        where: { id },
        include: { serviceOrders: true } // Opcional: incluye sus órdenes si lo necesitas
    });
}

export async function createVehicle(data: { plate: string; brand: string; model: string; ownerName: string }) {
    return prisma.vehicle.create({
        data
    });
}

export async function updateVehicle(id: number, data: Partial<{ plate: string; brand: string; model: string; ownerName: string }>) {
    try {
        return await prisma.vehicle.update({
            where: { id },
            data
        });
    } catch (error) {
        return null; // Si no existe o hay conflicto, manejas el null en el controlador
    }
}

export async function deleteVehicle(id: number): Promise<boolean> {
    try {
        await prisma.vehicle.delete({
            where: { id }
        });
        return true;
    } catch (error) {
        return false; // Retorna false si el vehículo no existe
    }
}