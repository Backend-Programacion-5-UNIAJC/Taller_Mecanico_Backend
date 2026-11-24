// src/schemas/serviceOrder.schema.ts
import { z } from 'zod';

const orderStatusEnum = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], {
  error: 'status debe ser PENDING, IN_PROGRESS, COMPLETED o CANCELLED',
});

export const createServiceOrderSchema = z.object({
  vehicleId: z.coerce
    .number({ error: 'vehicleId debe ser un numero' })
    .int('vehicleId debe ser un entero')
    .positive('vehicleId debe ser mayor que 0'),
  mechanicId: z.coerce
    .number({ error: 'mechanicId debe ser un numero' })
    .int('mechanicId debe ser un entero')
    .positive('mechanicId debe ser mayor que 0')
    .nullable()
    .optional(),
  description: z
    .string({ error: 'description es obligatorio' })
    .trim()
    .min(3, 'description debe tener al menos 3 caracteres'),
  status: orderStatusEnum.optional(),
});

export const updateServiceOrderSchema = createServiceOrderSchema
  .omit({ vehicleId: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, 'Envie al menos un campo para actualizar');

export type CreateServiceOrderBody = z.infer<typeof createServiceOrderSchema>;
export type UpdateServiceOrderBody = z.infer<typeof updateServiceOrderSchema>;