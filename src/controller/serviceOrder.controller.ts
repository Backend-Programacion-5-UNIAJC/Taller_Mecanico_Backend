import { Request, Response } from "express";
import * as serviceOrderService from '../services/serviceOrder.service';
import { AuthRequest } from "../middlewares/auth.middleware";

export async function getallServiceOrders(req: Request, res: Response) {
    const orders = await serviceOrderService.listServiceOrders();
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
    return res.status(400).json({ error: 'vehicleId y description son obligatorios' });
  }

  const order = await serviceOrderService.createServiceOrder(
    { vehicleId: Number(vehicleId), mechanicId, description, status },
    req.user!
  );
  res.status(201).json(order);
}

export async function updateServiceOrder(req: AuthRequest, res: Response) {
  const { description, status, mechanicId } = req.body ?? {};
  try {
    const order = await serviceOrderService.updateServiceOrderAsOwner(
      Number(req.params.id),
      req.user!,
      { description, status, mechanicId }
    );
    res.status(200).json(order);
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Orden de servicio no encontrada' });
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return res.status(403).json({
        error: 'Solo el mecanico asignado o un administrador puede editarla',
      });
    }
    throw error;
  }
}

export async function deleteServiceOrder(req: AuthRequest, res: Response) {
  try {
    const deleted = await serviceOrderService.deleteServiceOrderAsOwner(
      Number(req.params.id),
      req.user!
    );
    if (!deleted) {
      return res.status(404).json({ error: 'Orden de servicio no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Orden de servicio no encontrada' });
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return res.status(403).json({
        error: 'Solo el mecanico asignado o un administrador puede eliminarla',
      });
    }
    throw error;
  }
}

export async function getMyServiceOrders(req: AuthRequest, res: Response) {
  const orders = await serviceOrderService.getMyServiceOrders(req.user!);
  res.status(200).json(orders);
}