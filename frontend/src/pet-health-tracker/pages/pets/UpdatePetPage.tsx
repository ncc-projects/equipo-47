import { CustomButton } from '@/components/custom/CustomButton';
import { CustomDatePicker } from '@/components/custom/CustomDatePicker';
import { Header } from '@/components/Header';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { useUpdatePetByID } from './edit/hooks/useUpdatePetByID';
import {
  updatePetSchema,
  type UpdatePetForm,
} from './edit/schemas/updatePetSchema';
import { useGetPetByID } from './profile/hooks/useGetPetByID';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CustomTextField } from '@/components/custom/CustomTextField';

const Dog = '/src/assets/pets/dog.png';

export const UpdatePetPage = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const { data } = useGetPetByID(petId || '');

  const form = useForm<UpdatePetForm>({
    resolver: zodResolver(updatePetSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || undefined,
        species: data.species || undefined,
        breed: data.breed || undefined,
        gender: data.gender,
        weight: data.weight || undefined,
        birthDate: data.birthDate || undefined,
        color: data.color || undefined,
        feeding: data.feeding || undefined,
        neutered: data.neutered,
        notes: data.notes || undefined,
        profileImageUrl: data.profileImageUrl || null,
      });
    }
  }, [data, reset]);

  const { mutateAsync } = useUpdatePetByID(petId || '');

  const onSubmit = async (formData: UpdatePetForm) => {
    const isValid = await mutateAsync({
      petId: petId || '',
      pet: formData,
    });

    if (isValid) {
      toast.success('Se actualizó correctamente la mascota', {
        position: 'top-center',
        duration: 3000,
      });
      navigate('/');
      return;
    }

    toast.error('No se pudo actualizar la mascota');
  };

  return (
    <>
      <Header
        img={data?.profileImageUrl || Dog}
        imgClass='w-60 object-contain'
        title='Actualiza tu mascota'
        titleClass='font-normal text-xl mt-6'
      />

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-7.5'
        >
          {/* name pet */}
          <CustomTextField
            control={control}
            name='name'
            label='Nombre'
            placeholder='Ramen'
          />

          {/* species pet */}
          <CustomTextField
            control={control}
            name='species'
            label='Especie'
            placeholder='Perro'
          />

          {/* breed pet */}
          <CustomTextField
            control={control}
            name='breed'
            label='Raza'
            placeholder='Boyero de Berna'
          />

          {/* gender pet */}
          <Controller
            name='gender'
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <div className='flex justify-between gap-12'>
                  <CustomButton
                    type='button'
                    onClick={() => onChange('HEMBRA')}
                    className={
                      value === 'HEMBRA'
                        ? 'bg-transparent text-black border-2 border-primary'
                        : 'text-black border-2 border-primary'
                    }
                  >
                    Hembra
                  </CustomButton>
                  <CustomButton
                    type='button'
                    onClick={() => onChange('MACHO')}
                    className={
                      value === 'MACHO'
                        ? 'bg-transparent text-black border-2 border-primary'
                        : 'text-black border-2 border-primary'
                    }
                  >
                    Macho
                  </CustomButton>
                </div>
                {errors.gender && (
                  <span className='text-red-500 text-sm'>
                    {errors.gender.message}
                  </span>
                )}
              </>
            )}
          />

          {/* date birthday pet */}
          <CustomDatePicker
            form={form}
            label='Fecha de nacimiento'
            name='birthDate'
          />

          {/* weight pet */}
          <CustomTextField
            control={control}
            name='weight'
            label='Peso (kg)'
            placeholder='10'
            type='number'
          />

          {/* color pet */}
          <CustomTextField
            control={control}
            name='color'
            label='Color'
            placeholder='Tricolor'
          />

          {/* feeding pet */}
          <CustomTextField
            control={control}
            name='feeding'
            label='Alimentación'
            placeholder='Royal Canin'
          />

          <FormField
            control={control}
            name='neutered'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>¿Está castrado?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(val) => {
                      field.onChange(val === 'true');
                    }}
                    value={
                      field.value === true
                        ? 'true'
                        : field.value === false
                        ? 'false'
                        : undefined
                    }
                    className='flex flex-row gap-4'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='true' />
                      </FormControl>
                      <FormLabel className='font-normal cursor-pointer'>
                        Sí
                      </FormLabel>
                    </FormItem>

                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='false' />
                      </FormControl>
                      <FormLabel className='font-normal cursor-pointer'>
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* notes pet */}
          <div>
            <fieldset
              className={`border-2 bg-white rounded-lg w-full transition-colors ${
                errors.notes
                  ? 'border-red-500'
                  : 'border-primary focus-within:border-primary'
              }`}
            >
              <legend className='ml-3 px-1 text-xs font-semibold'>
                Añadir nota
              </legend>
              <Controller
                name='notes'
                control={control}
                render={({ field }) => (
                  <textarea
                    rows={5}
                    maxLength={500}
                    className='bg-transparent outline-none w-full px-4 pb-2 pt-1 text-xs resize-none'
                    {...field}
                  />
                )}
              />
            </fieldset>
            {errors.notes && (
              <span className='text-red-500 text-sm'>
                {errors.notes.message}
              </span>
            )}
          </div>

          <CustomButton type='submit'>Actualizar mascota</CustomButton>
        </form>
      </Form>
    </>
  );
};
