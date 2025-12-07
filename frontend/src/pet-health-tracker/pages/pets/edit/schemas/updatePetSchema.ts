import { z } from 'zod';
import { createPetSchema } from '../../create/schemas/createPetSchema';

export const updatePetSchema = createPetSchema.partial().extend({
  profileImageUrl: z.string().nullable().optional(),
});

export type UpdatePetForm = z.infer<typeof updatePetSchema>;
