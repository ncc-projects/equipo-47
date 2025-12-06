import { z } from 'zod';
import { createPetSchema } from '../../create/schemas/createPetSchema';

export const updatePetSchema = createPetSchema.partial().extend({
  profileImageUrl: z.string().nullable(),
});

export type UpdatePetForm = z.infer<typeof updatePetSchema>;

export type UpdatePetAPI = Omit<
  Partial<z.infer<typeof createPetSchema>>,
  'neutered'
> & {
  neutered?: boolean;
};

export const transformUpdatePetData = (
  formData: UpdatePetForm
): UpdatePetAPI => {
  const { neutered, ...rest } = formData;

  return {
    ...rest,
    ...(neutered !== undefined && { neutered: neutered === 'yes' }),
  };
};
