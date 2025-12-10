import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { addMonths, subMonths, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetPets } from '../home/hooks/useGetPets';
import { CardReminders } from './components/CardReminders';
import { useGetVaccinateEvents } from '../home/hooks/useGetVaccinateEvents';
import { generatePetTheme } from './helper/generatePetTheme';

export interface ThemeConfig {
  cardBg: string;
  chipBg: string;
  isDarkText: boolean;
}

export interface CurrentMonthReminder {
  id: number;
  petName: string;
  petImage: string | null;
  task: string;
  theme: ThemeConfig;
}

export const CalendarPage = () => {
  const { data: pets = [] } = useGetPets();
  const { data: vaccinateResponse = [] } = useGetVaccinateEvents();

  const events = vaccinateResponse.flatMap((entry) =>
    entry.vaccineEvents.map((event) => ({
      ...event,
      pet: entry.pet,
    }))
  );

  const [month, setMonth] = useState<Date>(new Date(2025, 11, 1));

  const handlePrevMonth = () => setMonth(subMonths(month, 1));
  const handleNextMonth = () => setMonth(addMonths(month, 1));

  const { modifiers, modifiersStyles, reminders } = useMemo(() => {
    const dynamicModifiers: Record<string, Date[]> = {};
    const dynamicStyles: Record<string, React.CSSProperties> = {};
    const currentMonthReminders: CurrentMonthReminder[] = [];

    pets.forEach((_, index) => {
      const themeId = `pet_theme_${index}`;
      dynamicModifiers[themeId] = [];

      const theme = generatePetTheme(index);

      dynamicStyles[themeId] = {
        backgroundColor: theme.mainColor,
        color: '#FFFFFF',
      };
    });

    events.forEach((evt) => {
      const dateObj = new Date(evt.scheduledDate + 'T12:00:00');

      const petIndex = pets.findIndex((p) => p.id === evt.pet!.id);

      if (petIndex === -1) return;

      const themeId = `pet_theme_${petIndex}`;
      const theme = generatePetTheme(petIndex);

      if (dynamicModifiers[themeId]) {
        dynamicModifiers[themeId].push(dateObj);
      }

      if (
        dateObj.getMonth() === month.getMonth() &&
        dateObj.getFullYear() === month.getFullYear()
      ) {
        currentMonthReminders.push({
          id: evt.id,
          petName: evt.pet?.name || 'Mascota',
          petImage: evt.pet?.profileImageUrl,
          task: `Vacuna: ${evt.vaccineType.name}`,
          theme: {
            cardBg: theme.mainColor,
            chipBg: theme.chipColor,
            isDarkText: false,
          },
        });
      }
    });

    return {
      modifiers: dynamicModifiers,
      modifiersStyles: dynamicStyles,
      reminders: currentMonthReminders,
    };
  }, [events, pets, month]);

  return (
    <div className='flex flex-col gap-6 justify-center items-center bg-[#FFF5E6]'>
      <div className='relative w-full md:w-96 mt-6'>
        {/* Decoración Anillos */}
        <div className='absolute -top-5 left-0 w-full flex justify-evenly px-2 z-20 pointer-events-none'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='flex flex-col items-center'>
              <div className='w-5 h-9 bg-[#F4A261] border-[3px] border-[#4B4B4B] rounded-full mb-[-15px] z-20'></div>
              <div className='w-5 h-5 bg-[#4B4B4B] rounded-full'></div>
            </div>
          ))}
        </div>

        <div className='bg-white border-[3px] border-[#4B4B4B] rounded-4xl shadow-lg overflow-hidden'>
          {/* Header */}
          <div className='pt-10 pb-2 px-6'>
            <div className='flex justify-between items-center mb-1'>
              <h2 className='text-2xl font-black text-[#4B4B4B] uppercase tracking-wide first-letter:uppercase'>
                {format(month, 'MMMM yyyy', { locale: es })}
              </h2>
              <div className='flex gap-1'>
                <button
                  onClick={handlePrevMonth}
                  className='hover:bg-gray-100 p-1 rounded transition-colors'
                >
                  <ChevronLeft size={20} color='#4B4B4B' />
                </button>
                <button
                  onClick={handleNextMonth}
                  className='hover:bg-gray-100 p-1 rounded transition-colors'
                >
                  <ChevronRight size={20} color='#4B4B4B' />
                </button>
              </div>
            </div>
          </div>

          <Calendar
            mode='single'
            month={month}
            onMonthChange={setMonth}
            locale={es}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            modifiersClassNames={{
              ...Object.keys(modifiers).reduce(
                (acc, key) => ({
                  ...acc,
                  [key]: 'font-bold rounded-full border-[3px] border-[#4B4B4B]',
                }),
                {}
              ),
              today:
                'text-[#4B4B4B] font-black border-[3px] border-[#4B4B4B] rounded-full bg-white',
            }}
            className='p-0 w-full'
            classNames={{
              month: 'w-full flex flex-col gap-0 space-y-0 pb-8',
              caption: 'hidden h-0 p-0',
              caption_label: '!hidden',
              nav: '!hidden',
              table: 'w-full border-separate border-spacing-y-3 mt-0',
              head_row:
                'grid grid-cols-7 text-center border-b-[4px] border-[#4B4B4B] pb-1 pt-2',
              head_cell: 'text-[#4B4B4B] font-bold text-sm uppercase',
              row: 'grid grid-cols-7 text-center',
              cell: 'p-0 relative',
              day: `
                h-10 w-10 mx-auto
                flex items-center justify-center
                font-bold text-lg 
                text-black
                rounded-full
                hover:bg-[#e5e5e5] 
                transition-colors
                border-[3px] border-transparent
              `,
              day_outside: 'text-gray-300 opacity-0 pointer-events-none',
            }}
          />
        </div>
      </div>

      {reminders.length === 0 ? (
        <p className='text-sm text-gray-500 italic text-center py-4'>
          No hay vacunas programadas para este mes.
        </p>
      ) : (
        <div className='w-full md:w-96'>
          <CardReminders reminders={reminders} />
        </div>
      )}
    </div>
  );
};
