import { Request, Response } from "express";
import * as serviceOrderService from '../services/serviceOrder.service';
import { AuthRequest } from "../middlewares/auth.middleware";

export async function getallServiceOrders(req: Request, res: Response) {
    const orders = await serviceOrderService.listServiceOrdes();
    return res.status(200).json(orders);
}

export async function getServiceOrderById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const serviceOrder = await serviceOrderService.findServiceOrderById(id);
    if (!serviceOrder) {
        return res.status(404).json({ error: 'Orden de servicio no encontrada' });
    }
    return res.status(200).json(serviceOrder);
}

// Recibe AuthRequest porque la ruta pasa antes por requireAuth.
export async function createServiceOrder(req: AuthRequest, res: Response) {
    const { vehicleId, mechanicId, description, status } = req.body ?? {};

    if (!vehicleId || !description) {
        return res.status(400).json({ error: "vehicleId y description son obligatorios." });
    }

    const serviceOrder = await serviceOrderService.createServiceOrder({vehicleId,mechanicId,description,status // Sincronizado con el enum OrderStatus de tu schema.prisma
    });
    return res.status(201).json(serviceOrder);
}

export async function updateServiceOrder(req: Request, res: Response) {
    const { vehicleId, mechanicId, description, fecha, status } = req.body ?? {};
    const serviceOrder = await serviceOrderService.updateServiceOrder(Number(req.params.id), {vehicleId,mechanicId,description,fecha,status
    });
    if (!serviceOrder) return res.status(404).json({ error: 'Orden de servicio no encontrada' });
    return res.status(200).json(serviceOrder);
}

export async function deleteServiceOrder(req: Request, res: Response) {
    const deleted = await serviceOrderService.deleteServiceOrder(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Orden de servicio no encontrada' }); // Corregido a 404
    return res.status(204).send();
}