import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface CustomTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute; // 'text', 'number', 'email', etc.
  disabled?: boolean;
}

export const CustomTextField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  disabled = false,
}: CustomTextFieldProps<T>) => {
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
              <input
                {...field}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                // Evitamos el error de "uncontrolled component" si el valor es null/undefined
                value={field.value ?? ''}
                // Si es tipo número, aseguramos que React Hook Form reciba el número real, no string
                onChange={(e) => {
                  if (type === 'number') {
                    const value = e.target.valueAsNumber;
                    field.onChange(isNaN(value) ? undefined : value);
                  } else {
                    field.onChange(e);
                  }
                }}
                className='bg-transparent outline-none w-full h-10 px-4 pb-2 pt-1 text-xs placeholder:text-muted-foreground'
              />
            </fieldset>
          </FormControl>
          <FormMessage className='text-xs ml-1' />
        </FormItem>
      )}
    />
  );
};
