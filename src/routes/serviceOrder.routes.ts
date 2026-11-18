import { Router } from "express";
import { getallServiceOrders, getServiceOrderById, createServiceOrder, updateServiceOrder, deleteServiceOrder } from "../controller/serviceOrder.controller";
import { requireAuth, requireRole } from '../middlewares/auth.middleware';

const router = Router();

// Todas las operaciones de órdenes de servicio requieren autenticación
router.get('/', getallServiceOrders);
router.get('/:id', getServiceOrderById);


// Crear, actualizar y eliminar órdenes (Restringido a ADMIN y MECHANIC)
router.post('/', requireAuth, requireRole('ADMIN', 'MECHANIC'), createServiceOrder);
router.put('/:id', requireAuth, requireRole('ADMIN', 'MECHANIC'), updateServiceOrder);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteServiceOrder);

export default router;