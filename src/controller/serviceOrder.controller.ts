import { Request, Response } from "express";
import * as serviceOrderService from '../services/serviceOrder.service';
import { AuthRequest } from "../middlewares/auth.middleware";

export async function getallServiceOrders(req: Request, res: Response) {
  res.status(200).json(await serviceOrderService.listServiceOrders());
}

export async function getServiceOrderById(req: Request, res: Response) {
  res.status(200).json(await serviceOrderService.findServiceOrderById(Number(req.params.id)));
}

// Recibe AuthRequest porque la ruta pasa antes por requireAuth.
export async function createServiceOrder(req: AuthRequest, res: Response) {
  const order = await serviceOrderService.createServiceOrder(req.body, req.user!);
  res.status(201).json(order);
}

export async function updateServiceOrder(req: AuthRequest, res: Response) {
  const order = await serviceOrderService.updateServiceOrderAsOwner(
    Number(req.params.id),
    req.user!,
    req.body
  );
  res.status(200).json(order);
}

export async function deleteServiceOrder(req: AuthRequest, res: Response) {
  await serviceOrderService.deleteServiceOrderAsOwner(Number(req.params.id), req.user!);
  res.status(204).send();
}

export async function getMyServiceOrders(req: AuthRequest, res: Response) {
  res.status(200).json(await serviceOrderService.getMyServiceOrders(req.user!));
}