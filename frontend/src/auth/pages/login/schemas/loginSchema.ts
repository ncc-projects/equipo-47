import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ error: 'El correo electrónico es inválido' }),
  password: z.string().min(1, { error: 'La contraseña es obligatoria' }),
});
