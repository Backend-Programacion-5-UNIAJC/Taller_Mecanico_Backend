import { Request, Response } from 'express';
import * as mechanicService from '../services/mechanic.service';

export async function getAllMechanics(req: Request, res: Response) {
  res.status(200).json(await mechanicService.listMechanics());
}

export async function getMechanicById(req: Request, res: Response) {
  res.status(200).json(await mechanicService.findMechanicById(Number(req.params.id)));
}

export async function createMechanic(req: Request, res: Response) {
  res.status(201).json(await mechanicService.createMechanic(req.body));
}

export async function updateMechanic(req: Request, res: Response) {
  res.status(200).json(await mechanicService.updateMechanic(Number(req.params.id), req.body));
}

export async function deleteMechanic(req: Request, res: Response) {
  await mechanicService.deleteMechanic(Number(req.params.id));
  res.status(204).send();
}