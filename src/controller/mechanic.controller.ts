import { Request, Response } from 'express';
import * as mechanicService from '../services/mechanic.service';

export async function getAllMechanics(req: Request, res: Response) {
    const mechanics = await mechanicService.listMechanics();
    return res.status(200).json(mechanics);
}

export async function getMechanicById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const mechanic = await mechanicService.findMechanicById(id);
    if (!mechanic) {
        return res.status(404).json({ error: 'Mecanico no encontrado' });
    }
    return res.status(200).json(mechanic);
}

export async function createMechanic(req: Request, res: Response) {
    const { name, specialty, email } = req.body ?? {};

    if (!name || !specialty || !email) {
        return res.status(400).json({ error: "name, specialty y email son obligatorios" });
    }
    const mechanic = await mechanicService.createMechanic({ name, specialty, email });
    return res.status(201).json(mechanic);
}

export async function updateMechanic(req: Request, res: Response) {
    const { name, specialty, email } = req.body ?? {};
    const mechanic = await mechanicService.updateMechanic(Number(req.params.id), { name, specialty, email });
    if (!mechanic) return res.status(404).json({ error: 'Mecanico no encontrado' });
    return res.status(200).json(mechanic);
}

export async function deleteMechanic(req: Request, res: Response) {
    const deleted = await mechanicService.deleteMechanic(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Mecanico no encontrado' }); // Corregido a 404
    return res.status(204).send();
}