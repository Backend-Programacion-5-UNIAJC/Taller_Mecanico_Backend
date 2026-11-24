import {Router } from 'express';
import { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } from '../controller/vehicle.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { idParamSchema } from '../schemas/common.schema';
import { createVehicleSchema, updateVehicleSchema } from '../schemas/vehicle.schema';

const router = Router();
const id = validate(idParamSchema, 'params');

// Lectura de vehículos
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);


// Escritura y gestión (Protegidas para ADMIN o MECHANIC)
router.post('/', requireAuth, requireRole('ADMIN', 'MECHANIC'),validate(createVehicleSchema), createVehicle);
router.put('/:id', requireAuth, requireRole('ADMIN', 'MECHANIC'),validate(updateVehicleSchema), updateVehicle);
router.delete('/:id', requireAuth, requireRole('ADMIN'),id, deleteVehicle); // Solo ADMIN elimina vehículos

export default router;