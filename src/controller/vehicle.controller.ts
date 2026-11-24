import { Request, Response } from 'express';
import * as vehicleService from '../services/vehicle.service';

export async function getAllVehicles(req: Request, res: Response) {
  res.status(200).json(await vehicleService.listVehicles());
}

export async function getVehicleById(req: Request, res: Response) {
  res.status(200).json(await vehicleService.findVehicleById(Number(req.params.id)));
}

export async function createVehicle(req: Request, res: Response) {
  res.status(201).json(await vehicleService.createVehicle(req.body));
}

export async function updateVehicle(req: Request, res: Response) {
  res.status(200).json(await vehicleService.updateVehicle(Number(req.params.id), req.body));
}

export async function deleteVehicle(req: Request, res: Response) {
  await vehicleService.deleteVehicle(Number(req.params.id));
  res.status(204).send();
}