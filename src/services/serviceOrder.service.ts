import * as serviceOrderRepository from '../repositories/serviceOrder.repository';
import * as mechanicRepository from '../repositories/mechanic.repository';
import { ServiceOrderInput } from '../models/serviceOrder.model';
import { AuthUser } from '../models/user.model';

export async function listServiceOrders() {
  return serviceOrderRepository.findAll();
}

export async function findServiceOrderById(id: number) {
  return serviceOrderRepository.findById(id);
}

// Si quien crea es MECHANIC, la orden queda asignada a su perfil de mecánico.
// El ADMIN puede indicar mechanicId en el body.
export async function createServiceOrder(data: ServiceOrderInput, user: AuthUser) {
  if (user.role === 'MECHANIC') {
    const mechanic = await mechanicRepository.findByUserId(user.id);
    data.mechanicId = mechanic ? mechanic.id : null;
  }
  return serviceOrderRepository.create(data);
}

// Autorización por mecánico asignado ("dueño" de la orden) o ADMIN
export async function updateServiceOrderAsOwner(
  id: number,
  user: AuthUser,
  data: Partial<ServiceOrderInput>
) {
  const order = await serviceOrderRepository.findWithOwner(id);
  if (!order) throw new Error('NOT_FOUND');
  if (user.role !== 'ADMIN' && order.mechanic?.userId !== user.id) {
    throw new Error('FORBIDDEN');
  }
  return serviceOrderRepository.update(id, data);
}

// Cierre del hueco en DELETE
export async function deleteServiceOrderAsOwner(id: number, user: AuthUser) {
  const order = await serviceOrderRepository.findWithOwner(id);
  if (!order) throw new Error('NOT_FOUND');
  if (user.role !== 'ADMIN' && order.mechanic?.userId !== user.id) {
    throw new Error('FORBIDDEN');
  }
  return serviceOrderRepository.remove(id);
}

export async function getMyServiceOrders(user: AuthUser) {
  if (user.role === 'ADMIN') {
    return serviceOrderRepository.findAll();
  }

  const mechanic = await mechanicRepository.findByUserId(user.id);
  if (!mechanic) {
    return [];
  }

  return serviceOrderRepository.findByMechanicId(mechanic.id);
}