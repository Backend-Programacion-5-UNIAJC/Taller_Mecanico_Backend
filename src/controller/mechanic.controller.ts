import { Request, Response } from 'express';
import * as mechanicService from '../services/mechanic.service'

export function getAllMechanics(req: Request, res: Response) {
    res.status(200).json(mechanicService.listMechanics())
}

export function getMechanicById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const mechanic = mechanicService.findMechanicById(Number(req.params.id));
    if (!mechanic) {
        return res.status(404).json({ error: 'Mecanico no encontrado'});
    }
    res.status(200).json(mechanic);
}

export function createMechanic(req: Request, res: Response) {
    const {name, specialty, email} = req.body;

    if(!name || !specialty || !email) {
        return res.status(400).json({ error: "name, specialty y email son obligatorios"});
    }
    const mechanic = mechanicService.createMechanic({name, specialty, email});
    res.status(201).json(mechanic);
}

export function updateMechanic(req: Request, res: Response) {
    const {name, specialty, email} = req.body;
    const mechanic = mechanicService.updateMechanic(Number(req.params.id), {name, specialty, email});
    if(!mechanic) return res.status(404).json({error: 'Mecanico no encontrado'});
    res.status(200).json(mechanic);
}

export function deleteMechanic(req: Request, res: Response) {
    const deleted = mechanicService.deleteMechanic(Number(req.params.id));
    if (!deleted) return res.status(400).json({error: 'Mecanico no encontrado'});
    res.status(204).send()
}