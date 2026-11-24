import { Router } from 'express';
import { getAllMechanics, getMechanicById, createMechanic, updateMechanic, deleteMechanic } from '../controller/mechanic.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { idParamSchema } from '../schemas/common.schema';
import { createMechanicSchema, updateMechanicSchema } from '../schemas/mechanic.schema';

const router = Router();
const id = validate(idParamSchema, 'params');

// Lectura pública o protegida
router.get('/', getAllMechanics);
router.get('/:id', getMechanicById);

// Gestión exclusiva de administradores
router.post('/', requireAuth, requireRole('ADMIN'), validate(createMechanicSchema), createMechanic);
router.put('/:id',requireAuth,requireRole('ADMIN'),id,validate(updateMechanicSchema),updateMechanic);
router.delete('/:id', requireAuth, requireRole('ADMIN'), id, deleteMechanic);

export default router;