import { Request, Response } from 'express';
import * as vehicleService from '../services/vehicle.service';

export async function getAllVehicles(req: Request, res: Response) {
    try {
        const vehicles = await vehicleService.listVehicles();
        return res.status(200).json(vehicles);
    } catch (error) {
        return res.status(500).json({ error: 'Error al listar los vehículos' });
    }
}

export async function getVehicleById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const vehicle = await vehicleService.findVehicleById(id);
    if (!vehicle) {
        return res.status(404).json({ error: 'Vehiculo no encontrado' });
    }
    return res.status(200).json(vehicle);
}

export async function createVehicle(req: Request, res: Response) {
    const { plate, brand, model, ownerName } = req.body ?? {};

    if (!plate || !brand || !model || !ownerName) {
        return res.status(400).json({ error: 'plate, brand, model y ownerName son obligatorios' });
    }
    const vehicle = await vehicleService.createVehicle({ plate, brand, model, ownerName });
    return res.status(201).json(vehicle);
}

export async function updateVehicle(req: Request, res: Response) {
    const { plate, brand, model, ownerName } = req.body ?? {};
    const vehicle = await vehicleService.updateVehicle(Number(req.params.id), { plate, brand, model, ownerName });
    if (!vehicle) return res.status(404).json({ error: 'Vehiculo no encontrado' });
    return res.status(200).json(vehicle);
}

export async function deleteVehicle(req: Request, res: Response) {
    const deleted = await vehicleService.deleteVehicle(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Vehiculo no encontrado' }); // Corregido a 404
    return res.status(204).send();
}