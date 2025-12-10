import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    token: z.string().nonempty({ error: 'El token es obligatorio' }),
    'new-password': z
      .string({ error: 'El campo password es obligatorio' })
      .min(8, { error: 'La contraseña debe tener al menos 8 caracteres' })
      .regex(/[A-Z]/, { error: 'Debe contener al menos una letra mayúscula' })
      .regex(/[0-9]/, { error: 'Debe contener al menos un número' })
      .regex(/[^a-zA-Z0-9]/, {
        error: 'Debe contener al menos un carácter especial',
      })
      .max(100),
    'new-password-confirmation': z
      .string({ error: 'El campo password es obligatorio' })
      .min(8, { error: 'La contraseña debe tener al menos 8 caracteres' })
      .regex(/[A-Z]/, { error: 'Debe contener al menos una letra mayúscula' })
      .regex(/[0-9]/, { error: 'Debe contener al menos un número' })
      .regex(/[^a-zA-Z0-9]/, {
        error: 'Debe contener al menos un carácter especial',
      })
      .max(100),
  })
  .refine(
    (data) => data['new-password'] === data['new-password-confirmation'],
    {
      error: 'Las contraseñas no coinciden',
      path: ['new-password-confirmation'],
    }
  );
