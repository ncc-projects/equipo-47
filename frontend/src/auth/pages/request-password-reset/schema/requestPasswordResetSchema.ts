import { z } from 'zod';

export const requestPasswordResetSchema = z.object({
  email: z.email({ error: 'Ingrese un correo válido' }),
});
