import { Router } from "express";
import { getallServiceOrders, getServiceOrderById, createServiceOrder, updateServiceOrder, deleteServiceOrder } from "../controller/serviceOrder.controller";

const router = Router();

router.get('/', getallServiceOrders);
router.get('/:id', getServiceOrderById);
router.post('/', createServiceOrder);
router.put('/:id', updateServiceOrder);
router.delete('/:id', deleteServiceOrder);

export default router;