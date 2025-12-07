import { z } from 'zod';

export const createVaccinateEventSchema = z
  .object({
    petId: z.number({ error: 'Elija una mascota' }),
    vaccineTypeId: z.number({ error: 'Elija un tipo de vacuna' }),
    date: z
      .string({ error: 'Elija una fecha de aplicación' })
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'La fecha debe estar en formato YYYY-MM-DD'
      ),
    expirationDate: z
      .string({ error: 'Elija una fecha de expiración' })
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'La fecha debe estar en formato YYYY-MM-DD'
      ),
    hasReminder: z.boolean(),
  })
  .refine((data) => new Date(data.expirationDate) >= new Date(data.date), {
    message: 'El vencimiento no puede ser antes de la aplicación',
    path: ['expirationDate'],
  });
