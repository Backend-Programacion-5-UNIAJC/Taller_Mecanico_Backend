import { mechanics } from "../data/mechanic";
import { ServiceOrder, serviceOrdes } from "../data/serviceOrder";

let nextId = 5;

export function listServiceOrdes(): ServiceOrder[] {
    return serviceOrdes
}

export function findServiceOrderById(id: number): ServiceOrder | undefined {
    return serviceOrdes.find(c => c.id === id);
}

export function createServiceOrder(data: Omit<ServiceOrder, 'id'>): ServiceOrder {
    const newServiceOrder: ServiceOrder = {id: nextId++, ...data};
    serviceOrdes.push(newServiceOrder);
    return newServiceOrder;
}

export function updateServiceOrder(id: number, data: Partial<ServiceOrder>): ServiceOrder | undefined {
    const serviceOrder = findServiceOrderById(id);
    if (!serviceOrder) return undefined;
    Object.assign(serviceOrder, data);
    return serviceOrder;
}

export function deleteServiceOrder(id: number): boolean {
    const index = serviceOrdes.findIndex(c => c.id === id);
    if (index === -1) return false;
    serviceOrdes.splice(index,1);
    return true;
}