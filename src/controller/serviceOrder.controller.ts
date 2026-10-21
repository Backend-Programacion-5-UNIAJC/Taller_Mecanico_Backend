import { Request, Response } from "express";
import * as serviceOrderService from '../services/serviceOrder.service'

export function getallServiceOrders(req: Request, res: Response) {
    res.status(200).json(serviceOrderService.listServiceOrdes());
}

export function getServiceOrderById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const serviceOrder = serviceOrderService.findServiceOrderById(Number(req.params.id));
    if(!serviceOrder) {
        return res.status(404).json({error: 'Orden de servicio no encontrada'})
    }
    res.status(200).json(serviceOrder);
}

export function createServiceOrder(req: Request, res: Response) {
    const {vehicle, mechanic, description, fecha, estado} = req.body;

    if(!vehicle || !mechanic || !description || !fecha || !estado) {
        return res.status(400).json({error: "Vehiculo, Mecanico, Descripcion, Fecha y estado son obligatorios."})
    }
    const serviceOrder = serviceOrderService.createServiceOrder({vehicle, mechanic, description, fecha: new Date(fecha), estado})
    res.status(201).json(serviceOrder);
}

export function updateServiceOrder(req: Request, res: Response) {
    const {vehicle, mechanic, description, fecha, estado} = req.body;
    const serviceOrder = serviceOrderService.updateServiceOrder(Number(req.params.id), {vehicle, mechanic, description, fecha, estado});
    if(!serviceOrder) return res.status(404).json({error: 'Orden de servicio no encontrada'});
    res.status(200).json(serviceOrder);
}

export function deleteServiceOrder(req: Request, res: Response) {
    const deleted = serviceOrderService.deleteServiceOrder(Number(req.params.id));
    if(!deleted) return res.status(400).json({error: 'Orden de servicio no encontrada'});
    res.status(204).send();
}