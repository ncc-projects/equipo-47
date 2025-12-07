import { z } from 'zod';
import { createPetSchema } from '../../create/schemas/createPetSchema';

export const updatePetSchema = createPetSchema.partial().extend({
  profileImageUrl: z.string().nullable().optional(),
  neutered: z.boolean({ error: 'Selecciona una opción' }),
});

export type UpdatePetForm = z.infer<typeof updatePetSchema>;
