import { Router } from 'express';
import { getAllMechanics, getMechanicById, createMechanic, updateMechanic, deleteMechanic } from '../controller/mechanic.controller';
import { requireAuth, requireRole } from '../middlewares/auth.middleware';

const router = Router();

// Lectura pública o protegida
router.get('/', getAllMechanics);
router.get('/:id', getMechanicById);

// Gestión exclusiva de administradores
router.post('/', requireAuth, requireRole('ADMIN'), createMechanic);
router.put('/:id', requireAuth, requireRole('ADMIN'), updateMechanic);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteMechanic);

export default router;