import { z } from 'zod';

export const createPetSchema = z.object({
  name: z
    .string({ error: 'Escriba el nombre de su mascota' })
    .min(3, { error: 'Escriba al menos 3 caracteres' }),
  species: z
    .string({ error: 'Escriba la especie de su mascota' })
    .min(3, { error: 'Escriba al menos 3 caracteres' }),
  breed: z
    .string({ error: 'Escriba la raza de su mascota' })
    .min(3, { error: 'Escriba al menos 3 caracteres' }),
  gender: z.enum(['female', 'male'], {
    error: 'Seleccione el sexo de su mascota',
  }),
  birthDate: z.string({ error: 'Elija la fecha de nacimiento de su mascota' }),
  weight: z
    .number({ error: 'El peso debe de ser un número' })
    .min(1, { error: 'Escriba el peso de su mascota' }),
  color: z
    .string({ error: 'Escriba el color de su mascota' })
    .min(3, { error: 'Escriba al menos 3 caracteres' }),
  feeding: z
    .string({ error: 'Escriba la alimentación de su mascota' })
    .min(3, { error: 'Escriba al menos 3 caracteres' }),
  neutered: z.enum(['yes', 'no'], {
    error: 'Seleccione si la mascota está castrada',
  }),
  notes: z.string().optional(),
});

export type CreatePet = z.infer<typeof createPetSchema>;
