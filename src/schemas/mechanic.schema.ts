import { z } from 'zod';

export const createMechanicSchema = z.object({
  name: z
    .string({ error: 'name es obligatorio' })
    .trim()
    .min(2, 'name debe tener al menos 2 caracteres'),
  specialty: z
    .string({ error: 'specialty es obligatoria' })
    .trim()
    .min(2, 'specialty debe tener al menos 2 caracteres'),
  email: z.email('email no es valido'),
  userId: z.coerce
    .number({ error: 'userId debe ser un numero' })
    .int('userId debe ser un entero')
    .positive('userId debe ser mayor que 0')
    .nullable()
    .optional(),
});

export const updateMechanicSchema = createMechanicSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, 'Envie al menos un campo para actualizar');

export type CreateMechanicBody = z.infer<typeof createMechanicSchema>;
export type UpdateMechanicBody = z.infer<typeof updateMechanicSchema>;