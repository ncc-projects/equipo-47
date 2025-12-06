import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createPetSchema,
  type CreatePet,
} from './create/schemas/createPetSchema';
import { CustomButton } from '@/components/custom/CustomButton';
import { useCreatePet } from './create/hooks/useCreatePet';
import { toast } from 'sonner';
import { useState, useRef, useEffect } from 'react';
import { UploadImage } from './create/components/UploadImage';

const Dog = '/src/assets/pets/dog.png';

export const CreatePetPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreatePet>({
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      weight: 0,
      birthDate: '',
      color: '',
      feeding: '',
      notes: '',
      neutered: undefined,
      gender: undefined,
    },
    resolver: zodResolver(createPetSchema),
  });

  const { mutateAsync } = useCreatePet();

  useEffect(() => {
    if (!image && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [image]);

  useEffect(() => {
    let preview: string | undefined;

    if (image) {
      preview = URL.createObjectURL(image);
    }

    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [image]);

  const onSubmit = async (formData: CreatePet) => {
    await mutateAsync({
      data: {
        ...formData,
        neutered: formData.neutered === 'yes' ? true : false,
        notes: formData.notes ?? '',
      },
      image,
    });

    toast.success('Se agregó correctamente la mascota', {
      position: 'top-center',
    });

    reset();
    setImage(null);
  };

  return (
    <>
      <UploadImage
        img={image ? URL.createObjectURL(image) : Dog}
        imgClass='w-60 h-50 rounded-lg'
        title='Agrega tu mascota'
        titleClass='font-normal text-xl mt-6'
        onRemoveImage={image ? () => setImage(null) : undefined}
        fileInputRef={fileInputRef}
      />

      {/* Imagen */}
      <input
        type='file'
        hidden
        ref={fileInputRef}
        accept='image/*'
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImage(file);
          }
        }}
      />
      {/* </div> */}

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-7.5'>
        {/* name pet */}
        <div>
          <fieldset
            className={`border-2 bg-white rounded-lg w-full transition-colors ${
              errors.name
                ? 'border-red-500'
                : 'border-primary focus-within:border-primary'
            }`}
          >
            <legend className='ml-3 px-1 text-xs font-semibold'>Nombre</legend>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  placeholder='Ramen'
                  className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                />
              )}
            />
          </fieldset>
          {errors.name && (
            <span className='text-red-500 text-sm'>{errors.name.message}</span>
          )}
        </div>

        {/* species pet */}
        <div>
          <fieldset
            className={`border-2 bg-white rounded-lg w-full transition-colors ${
              errors.species
                ? 'border-red-500'
                : 'border-primary focus-within:border-primary'
            }`}
          >
            <legend className='ml-3 px-1 text-xs font-semibold'>Especie</legend>
            <Controller
              control={control}
              name='species'
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  placeholder='Perro'
                  className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                />
              )}
            />
          </fieldset>
          {errors.species && (
            <span className='text-red-500 text-sm'>
              {errors.species.message}
            </span>
          )}
        </div>

        {/* breed pet */}
        <div>
          <fieldset
            className={`border-2 bg-white rounded-lg w-full transition-colors ${
              errors.breed
                ? 'border-red-500'
                : 'border-primary focus-within:border-primary'
            }`}
          >
            <legend className='ml-3 px-1 text-xs font-semibold'>Raza</legend>
            <Controller
              control={control}
              name='breed'
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  placeholder='Boyero de Berna'
                  className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                />
              )}
            />
          </fieldset>
          {errors.breed && (
            <span className='text-red-500 text-sm'>{errors.breed.message}</span>
          )}
        </div>

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
        <div>
          <fieldset
            className={`border-2 bg-white rounded-lg w-full transition-colors ${
              errors.birthDate
                ? 'border-red-500'
                : 'border-primary focus-within:border-primary'
            }`}
          >
            <legend className='ml-3 px-1 text-xs font-semibold'>
              Fecha de nacimiento
            </legend>
            <Controller
              name='birthDate'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='date'
                  placeholder='04/01/2020'
                  className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                />
              )}
            />
          </fieldset>
          {errors.birthDate && (
            <span className='text-red-500 text-sm'>
              {errors.birthDate.message}
            </span>
          )}
        </div>

        {/* weight pet */}
        <div>
          <fieldset
            className={`border-2 bg-white rounded-lg w-full transition-colors ${
              errors.weight
                ? 'border-red-500'
                : 'border-primary focus-within:border-primary'
            }`}
          >
            <legend className='ml-3 px-1 text-xs font-semibold'>
              Peso (kg)
            </legend>
            <Controller
              name='weight'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='number'
                  step='0.1'
                  placeholder='10'
                  className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                  onChange={(e) => {
                    const value = e.target.valueAsNumber;
                    field.onChange(isNaN(value) ? undefined : value);
                  }}
                />
              )}
            />
          </fieldset>
          {errors.weight && (
            <span className='text-red-500 text-sm'>
              {errors.weight.message}
            </span>
          )}
        </div>

        {/* color pet */}
        <div>
          <fieldset
            className={`border-2 bg-white rounded-lg w-full transition-colors ${
              errors.color
                ? 'border-red-500'
                : 'border-primary focus-within:border-primary'
            }`}
          >
            <legend className='ml-3 px-1 text-xs font-semibold'>Color</legend>
            <Controller
              name='color'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  placeholder='Tricolor'
                  className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                />
              )}
            />
          </fieldset>
          {errors.color && (
            <span className='text-red-500 text-sm'>{errors.color.message}</span>
          )}
        </div>

        {/* feeding pet */}
        <div>
          <fieldset
            className={`border-2 bg-white rounded-lg w-full transition-colors ${
              errors.feeding
                ? 'border-red-500'
                : 'border-primary focus-within:border-primary'
            }`}
          >
            <legend className='ml-3 px-1 text-xs font-semibold'>
              Alimentación
            </legend>
            <Controller
              name='feeding'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  placeholder='Royal Canin'
                  className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs'
                />
              )}
            />
          </fieldset>
          {errors.feeding && (
            <span className='text-red-500 text-sm'>
              {errors.feeding.message}
            </span>
          )}
        </div>

        {/* neutered pet */}
        <div>
          <fieldset
            className={`border-2 bg-white rounded-lg w-full transition-colors ${
              errors.neutered
                ? 'border-red-500'
                : 'border-primary focus-within:border-primary'
            }`}
          >
            <legend className='ml-3 px-1 text-xs font-semibold'>
              Castrado
            </legend>
            <Controller
              name='neutered'
              control={control}
              render={({ field: { value, onChange } }) => (
                <select
                  onChange={(e) => onChange(e.target.value)}
                  value={value?.toString() ?? ''}
                  className='bg-transparent outline-none w-24/25 h-10 px-4 pb-2 pt-1 text-xs'
                >
                  <option value='' disabled>
                    Seleccione una opción
                  </option>
                  <option value='yes'>Sí</option>
                  <option value='no'>No</option>
                </select>
              )}
            />
          </fieldset>
          {errors.neutered && (
            <span className='text-red-500 text-sm'>
              {errors.neutered.message}
            </span>
          )}
        </div>

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
            <span className='text-red-500 text-sm'>{errors.notes.message}</span>
          )}
        </div>

        <CustomButton type='submit'>Añadir mascota</CustomButton>
      </form>
    </>
  );
};
