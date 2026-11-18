import { OrderStatus } from '@prisma/client';

export interface ServiceOrder {
    id: number;
    vehicleId: number;
    mechanicId: number | null;
    description: string;
    status?: OrderStatus;
}

export type ServiceOrderInput = Omit<ServiceOrder, 'id'>;