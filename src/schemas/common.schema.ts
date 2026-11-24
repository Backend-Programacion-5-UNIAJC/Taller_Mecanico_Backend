import { z } from 'zod';

// Evita que /recurso/abc o /recurso/-1 lleguen a la base de datos.
export const idParamSchema = z.object({
  id: z.coerce
    .number({ error: 'id debe ser un numero' })
    .int('id debe ser un entero')
    .positive('id debe ser mayor que 0'),
});