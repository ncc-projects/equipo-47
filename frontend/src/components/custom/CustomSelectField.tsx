import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface Option {
  value: string | number | boolean;
  label: string;
}

interface CustomSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

export const CustomSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = 'Seleccione una opción',
  disabled = false,
}: CustomSelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <fieldset
              className={cn(
                'border-2 bg-white rounded-lg w-full transition-colors group',
                fieldState.error
                  ? 'border-red-500'
                  : 'border-primary focus-within:border-primary'
              )}
            >
              <legend className='ml-3 px-1 text-xs font-semibold'>
                {label}
              </legend>

              <Select
                disabled={disabled}
                value={field.value?.toString() ?? ''}
                onValueChange={(valString) => {
                  const selectedOption = options.find(
                    (opt) => opt.value.toString() === valString
                  );

                  if (selectedOption) {
                    field.onChange(selectedOption.value);
                  } else {
                    field.onChange(valString);
                  }
                }}
              >
                <SelectTrigger className='w-full border-0 bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 h-9 pt-1 px-3 text-left font-normal'>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem
                      key={opt.value.toString()}
                      value={opt.value.toString()}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>
          </FormControl>
          <FormMessage className='text-xs ml-1' />
        </FormItem>
      )}
    />
  );
};
