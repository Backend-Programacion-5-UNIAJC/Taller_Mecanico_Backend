import { prisma } from "../lib/prisma";

export async function listMechanics() {
    return prisma.mechanic.findMany({
        orderBy: { id: "asc" }
    });
}

export async function findMechanicById(id: number) {
    return prisma.mechanic.findUnique({
        where: { id },
        include: { serviceOrders: true }
    });
}

export async function createMechanic(data: { name: string; specialty: string; email: string }) {
    return prisma.mechanic.create({
        data
    });
}

export async function updateMechanic(id: number, data: Partial<{ name: string; specialty: string; email: string }>) {
    try {
        return await prisma.mechanic.update({
            where: { id },
            data
        });
    } catch (error) {
        return null;
    }
}

export async function deleteMechanic(id: number): Promise<boolean> {
    try {
        await prisma.mechanic.delete({
            where: { id }
        });
        return true;
    } catch (error) {
        return false;
    }
}