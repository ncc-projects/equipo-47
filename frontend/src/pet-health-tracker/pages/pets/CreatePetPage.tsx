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
import { useNavigate } from 'react-router';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CustomTextField } from '@/components/custom/CustomTextField';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CustomDatePicker } from '@/components/custom/CustomDatePicker';

const Dog = '/src/assets/pets/dog.png';

export const CreatePetPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const navigate = useNavigate();

  const form = useForm<CreatePet>({
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      weight: 0,
      birthDate: undefined,
      color: '',
      feeding: '',
      notes: '',
      neutered: false,
      gender: undefined,
    },
    resolver: zodResolver(createPetSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

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
        notes: formData.notes ?? '',
      },
      image,
    });

    toast.success('Se agregó correctamente la mascota', {
      position: 'top-center',
    });

    reset();
    setImage(null);
    navigate('/');
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
            label='Nombre'
            placeholder='Especie'
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
            placeholder='0.0'
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

          {/* neutered pet */}
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
          <CustomButton type='submit'>Añadir mascota</CustomButton>
        </form>
      </Form>
    </>
  );
};
