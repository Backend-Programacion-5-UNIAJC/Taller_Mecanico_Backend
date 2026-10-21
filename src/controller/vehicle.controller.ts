import {Request, Response } from 'express';
import * as vehicleService from '../services/vehicle.service'

export function getAllVehicles(req: Request, res:Response){
    res.status(200).json(vehicleService.listVehicles())
}

export function getVehicleById(req: Request, res: Response){
    const id = Number(req.params.id);
    const vehicle = vehicleService.findVehicleById(Number(req.params.id));
    if(!vehicle) {
        return res.status(404).json({error: 'Vehiculo no encontrado'});
    }
    res.status(200).json(vehicle);
}

export function createVehicle (req: Request, res: Response) {
    const{plate,brand,model,ownerName} = req.body;

    if(!plate || !brand || !model || !ownerName) {
        return res.status(400).json({error: 'plate,brand,model y ownerName son obligatorios'});
    }
    const vehicle = vehicleService.createVehicle({plate,brand,model,ownerName});
    res.status(201).json(vehicle);
}

export function updateVehicle (req: Request, res:Response) {
    const{plate,brand,model,ownerName} = req.body;
    const vehicle = vehicleService.updateVehicle(Number(req.params.id),{plate,brand,model,ownerName});
    if(!vehicle) return res.status(404).json({error: 'Vehiculo no encontrado'});
    res.status(200).json(vehicle);
}

export function deleteVehicle (req: Request, res: Response) {
    const deleted = vehicleService.deleteVehicle(Number(req.params.id));
    if(!deleted) return res.status(400).json({error: 'Vehiclulo no encontrado'});
    res.status(204).send();
}