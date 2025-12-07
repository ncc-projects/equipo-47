import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useGetVaccinateTypes } from '../health/hooks/useGetVaccinateTypes';
import { useGetPets } from '../home/hooks/useGetPets';
import type { CreateVaccinateEvent } from './interfaces/create-vaccinate-event';
import { createVaccinateEventSchema } from './schema/createVaccinateEventSchema';
import { useCreateVaccinateEvent } from './hooks/useCreateVaccinateEvent';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { CustomDatePicker } from '@/components/custom/CustomDatePicker';

const health = '/src/assets/pets/health.png';

export const CreateVaccinate = () => {
  const navigate = useNavigate();
  const form = useForm<CreateVaccinateEvent>({
    resolver: zodResolver(createVaccinateEventSchema),
    defaultValues: {
      hasReminder: false,
    },
  });

  const { handleSubmit, control } = form;

  const { mutateAsync } = useCreateVaccinateEvent();

  const onSubmit = async (formData: CreateVaccinateEvent) => {
    const isValid = await mutateAsync(formData);

    if (isValid) {
      toast.success('Se creó correctamente la vacuna', {
        position: 'top-center',
        duration: 3000,
      });
      navigate('/');
      return;
    }

    toast.error('No se pudo crear la vacuna');
  };

  const { data: pets = [] } = useGetPets();

  const { data: vaccineTypes = [] } = useGetVaccinateTypes();

  const watchDate = useWatch<CreateVaccinateEvent>({
    control: control,
    name: 'date',
  });

  return (
    <>
      <Header
        title='Añadir vacuna'
        img={health}
        titleClass='font-normal text-xl mt-4'
      />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          {/* SELECTOR DE VACUNA */}
          <FormField
            control={form.control}
            name='vaccineTypeId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Vacuna</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl className='w-full border-primary focus-within:border-primary transition-colors border-2 h-11!'>
                    <SelectTrigger className='bg-white'>
                      <SelectValue placeholder='Selecciona la vacuna' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vaccineTypes.map((v) => (
                      <SelectItem key={v.id} value={v.id.toString()}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* SELECTOR DE MASCOTA */}
          <FormField
            control={form.control}
            name='petId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mascota</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl className='w-full border-primary focus-within:border-primary transition-colors border-2 h-11!'>
                    <SelectTrigger className='bg-white'>
                      <SelectValue placeholder='Selecciona una mascota' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id.toString()}>
                        {pet.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FECHAS (Usando el componente reutilizable) */}
          <CustomDatePicker
            form={form}
            name='date'
            label='Fecha de aplicación'
          />

          <CustomDatePicker
            form={form}
            name='expirationDate'
            label='Fecha de vencimiento'
            // Opcional: Bloquear fechas anteriores a la de aplicación
            minDate={watchDate ? new Date(watchDate + 'T00:00:00') : undefined}
          />
          {/* CHECKBOX (Correctamente conectado) */}
          <FormField
            control={form.control}
            name='hasReminder'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-white border-primary focus-within:border-primary transition-colors border-2'>
                <FormControl className='border-primary focus-within:border-primary transition-colors border-2'>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Activar recordatorio</FormLabel>
                  <p className='text-xs text-muted-foreground'>
                    Te avisaremos antes de que venza.
                  </p>
                </div>
              </FormItem>
            )}
          />

          <Button type='submit' variant='primary'>
            Guardar
          </Button>
        </form>
      </Form>
    </>
  );
};
