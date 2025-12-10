import { cn } from '@/lib/utils';
import type { CurrentMonthReminder } from '../CalendarPage';

const Dog = '/src/assets/pets/dog.png';

export const CardReminder = ({
  petImage,
  petName,
  task,
  theme,
}: Omit<CurrentMonthReminder, 'id'>) => {
  const textColor = theme.isDarkText ? 'text-[#4B4B4B]' : 'text-white';

  return (
    <div
      className={
        'flex justify-between items-center gap-3 p-3 rounded-xl shadow-sm transition-transform hover:scale-[1.02]'
      }
      style={{ backgroundColor: theme.cardBg }}
    >
      {/* Contenedor de la Imagen */}
      <div className='bg-white p-0.5 rounded-full w-12 h-12 flex items-center justify-center shrink-0 border-2 border-[#4B4B4B] overflow-hidden'>
        <img
          src={petImage || Dog}
          alt={petName}
          className='w-full h-full object-cover rounded-full'
        />
      </div>

      {/* Información */}
      <div className='flex flex-col w-full gap-1 overflow-hidden'>
        <h4 className={cn('font-bold text-sm truncate', textColor)}>
          {petName}
        </h4>

        {task && (
          <div
            className={
              'text-xs px-2 py-0.5 rounded-md font-medium w-fit text-[#4B4B4B]'
            }
            style={{ backgroundColor: theme.chipBg }}
          >
            {task}
          </div>
        )}
      </div>
    </div>
  );
};
