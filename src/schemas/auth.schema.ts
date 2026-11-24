import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ error: 'name es obligatorio' })
    .trim()
    .min(2, 'name debe tener al menos 2 caracteres'),
  email: z.email('email no es valido'),
  password: z
    .string({ error: 'password es obligatorio' })
    .min(8, 'password debe tener al menos 8 caracteres'),
});

export const loginSchema = z.object({
  email: z.email('email no es valido'),
  password: z.string({ error: 'password es obligatorio' }).min(1, 'password es obligatorio'),
});