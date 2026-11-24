import { z } from 'zod';

export const createVehicleSchema = z.object({
  plate: z
    .string({ error: 'plate es obligatoria' })
    .trim()
    .min(3, 'plate debe tener al menos 3 caracteres')
    .max(15, 'plate no puede superar 15 caracteres')
    .transform((val) => val.toUpperCase()),
  brand: z
    .string({ error: 'brand es obligatoria' })
    .trim()
    .min(2, 'brand debe tener al menos 2 caracteres'),
  model: z
    .string({ error: 'model es obligatorio' })
    .trim()
    .min(1, 'model es obligatorio'),
  ownerName: z
    .string({ error: 'ownerName es obligatorio' })
    .trim()
    .min(2, 'ownerName debe tener al menos 2 caracteres'),
});

export const updateVehicleSchema = createVehicleSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, 'Envie al menos un campo para actualizar');

export type CreateVehicleBody = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleBody = z.infer<typeof updateVehicleSchema>;