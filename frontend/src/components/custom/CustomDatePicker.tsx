import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface CustomDatePickerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  minDate?: Date;
}

export const CustomDatePicker = <T extends FieldValues>({
  form,
  name,
  label,
  minDate,
}: CustomDatePickerProps<T>) => {
  const { error } = form.getFieldState(name, form.formState);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className='w-full'>
      <fieldset
        className={`border-2 bg-white rounded-lg w-full transition-colors ${
          form.formState.errors[name]
            ? 'border-red-500'
            : 'border-primary focus-within:border-primary'
        }`}
      >
        <legend className='ml-3 px-1 text-xs font-semibold'>{label}</legend>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => {
            const dateValue = field.value
              ? new Date(field.value + 'T00:00:00')
              : undefined;
            return (
              <FormItem className='space-y-0'>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='ghost'
                        className={cn(
                          'h-9 w-full justify-start text-left font-normal hover:bg-transparent',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {dateValue
                          ? format(dateValue, 'dd/MM/yyyy', { locale: es })
                          : 'Selecciona una fecha'}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={dateValue}
                      onSelect={(date) => {
                        if (date) {
                          // Ajustamos a formato YYYY-MM-DD
                          const formatted = format(date, 'yyyy-MM-dd');
                          field.onChange(formatted);
                          setIsCalendarOpen(false);
                        }
                      }}
                      disabled={(date) => (minDate ? date < minDate : false)}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            );
          }}
        />
      </fieldset>
      {error && (
        <span className='text-xs text-red-500 ml-1'>{error.message}</span>
      )}
    </div>
  );
};
