import { prisma } from "../lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function listServiceOrdes() {
    return prisma.serviceOrder.findMany({
        include: {
            vehicle: true,
            mechanic: true
        },
        orderBy: { id: "asc" }
    });
}

export async function findServiceOrderById(id: number) {
    return prisma.serviceOrder.findUnique({
        where: { id },
        include: {
            vehicle: true,
            mechanic: true
        }
    });
}

export async function createServiceOrder(data: {
    vehicleId: number;
    mechanicId?: number | null;
    description: string;
    status?: OrderStatus;
}) {
    return prisma.serviceOrder.create({
        data: {
            vehicleId: data.vehicleId,
            mechanicId: data.mechanicId ?? null,
            description: data.description,
            status: data.status ?? OrderStatus.PENDING
        },
        include: {
            vehicle: true,
            mechanic: true
        }
    });
}

export async function updateServiceOrder(
    id: number,
    data: Partial<{
        vehicleId: number;
        mechanicId: number | null;
        description: string;
        fecha: Date;
        status: OrderStatus;
    }>
) {
    try {
        return await prisma.serviceOrder.update({
            where: { id },
            data,
            include: {
                vehicle: true,
                mechanic: true
            }
        });
    } catch (error) {
        return null;
    }
}

export async function deleteServiceOrder(id: number): Promise<boolean> {
    try {
        await prisma.serviceOrder.delete({
            where: { id }
        });
        return true;
    } catch (error) {
        return false;
    }
}