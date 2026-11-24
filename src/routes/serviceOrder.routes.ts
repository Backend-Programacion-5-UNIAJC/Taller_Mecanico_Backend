import { Router } from "express";
import { getallServiceOrders, getServiceOrderById, createServiceOrder, updateServiceOrder, deleteServiceOrder, getMyServiceOrders } from "../controller/serviceOrder.controller";
import { requireAuth, requireRole } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { idParamSchema } from '../schemas/common.schema';
import {
  createServiceOrderSchema,
  updateServiceOrderSchema,
} from '../schemas/serviceOrder.schema';

const router = Router();

// Todas las operaciones de órdenes de servicio requieren autenticación
router.get('/', getallServiceOrders);
// Reto opcional: protegida con requireAuth y declarada ANTES de /:id
router.get('/mios', requireAuth, getMyServiceOrders);
router.get('/:id', getServiceOrderById);


// Crear, actualizar y eliminar órdenes (Restringido a ADMIN y MECHANIC)
router.post('/', requireAuth, requireRole('ADMIN', 'MECHANIC'), validate(createServiceOrderSchema), createServiceOrder);
router.put('/:id', requireAuth, requireRole('ADMIN', 'MECHANIC'),validate(createServiceOrderSchema), updateServiceOrder);
router.delete('/:id', requireAuth, requireRole('ADMIN'),validate(createServiceOrderSchema), deleteServiceOrder);

export default router;