import {Router } from 'express';
import { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } from '../controller/vehicle.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';

const router = Router();

// Lectura de vehículos
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);


// Escritura y gestión (Protegidas para ADMIN o MECHANIC)
router.post('/', requireAuth, requireRole('ADMIN', 'MECHANIC'), createVehicle);
router.put('/:id', requireAuth, requireRole('ADMIN', 'MECHANIC'), updateVehicle);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteVehicle); // Solo ADMIN elimina vehículos

export default router;