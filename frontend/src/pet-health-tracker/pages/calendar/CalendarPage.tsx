import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { addMonths, subMonths, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVaccineStore } from '../store/vaccine.store';
import { useGetPets } from '../home/hooks/useGetPets';

export const CalendarPage = () => {
  const events = useVaccineStore((state) => state.events);

  // Necesitamos las mascotas para saber el nombre y asignar color (Pet 1 = Naranja, Pet 2 = Verde)
  const { data: pets = [] } = useGetPets();

  // Estado del calendario (Iniciamos hoy o en Diciembre 2025 para probar)
  const [month, setMonth] = useState<Date>(new Date(2025, 11, 1));

  const handlePrevMonth = () => setMonth(subMonths(month, 1));
  const handleNextMonth = () => setMonth(addMonths(month, 1));

  // 2. LÓGICA DE PROCESAMIENTO (Dinámica)
  const { orangeDates, greenDates, reminders } = useMemo(() => {
    // Arrays para los estilos del calendario
    const orange: Date[] = [];
    const green: Date[] = [];

    // Array para la lista de abajo
    const currentMonthReminders: {
      id: number; // clave única
      petName: string;
      petImage: string | null; // Si tienes imagen
      task: string;
      color: 'orange' | 'green';
    }[] = [];

    events.forEach((evt) => {
      // a. Convertir fecha (Evitar problemas de zona horaria agregando hora)
      const dateObj = new Date(evt.scheduledDate + 'T12:00:00');

      // b. Encontrar a qué mascota pertenece este evento
      // Buscamos en el array de pets el índice para asignar color
      const petIndex = pets.findIndex((p) => p.id === evt.petId);
      const petData = pets[petIndex];

      // Si no encontramos la mascota (ej: data incompleta), saltamos
      if (petIndex === -1) return;

      // c. Asignar color: Pares = Naranja, Impares = Verde (o tu propia lógica)
      const color = petIndex % 2 === 0 ? 'orange' : 'green';

      // d. Llenar arrays de fechas para el calendario
      if (color === 'orange') {
        orange.push(dateObj);
      } else {
        green.push(dateObj);
      }

      // e. Filtrar recordatorios para la lista inferior (Solo mes actual)
      if (
        dateObj.getMonth() === month.getMonth() &&
        dateObj.getFullYear() === month.getFullYear()
      ) {
        currentMonthReminders.push({
          id: evt.id,
          petName: petData?.name || 'Mascota',
          petImage: petData?.profileImageUrl,
          task: `Vacuna: ${evt.vaccineType.name}`,
          color: color,
        });
      }
    });

    return {
      orangeDates: orange,
      greenDates: green,
      reminders: currentMonthReminders,
    };
  }, [events, pets, month]); // Se recalcula si cambian los eventos, las mascotas o el mes

  return (
    <div className='flex flex-col gap-6 justify-center items-center p-10 bg-[#FFF5E6] min-h-screen'>
      {/* --- CALENDARIO --- */}
      <div className='relative w-80 bg-white border-[3px] border-[#4B4B4B] rounded-4xl shadow-lg overflow-hidden'>
        {/* Decoración Anillos */}
        <div className='absolute -top-5 left-0 w-full flex justify-evenly px-2 z-20 pointer-events-none'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='flex flex-col items-center'>
              <div className='w-5 h-9 bg-[#F4A261] border-[3px] border-[#4B4B4B] rounded-full mb-[-15px] z-20'></div>
              <div className='w-5 h-5 bg-[#4B4B4B] rounded-full'></div>
            </div>
          ))}
        </div>

        {/* Header con Navegación */}
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
          modifiers={{
            orangeEvent: orangeDates,
            greenEvent: greenDates,
          }}
          modifiersClassNames={{
            orangeEvent:
              'bg-[#FDAA68] text-gray-900 font-bold hover:bg-[#FDAA68] rounded-full',
            greenEvent:
              'bg-[#98D8C8] text-gray-900 font-bold hover:bg-[#98D8C8] rounded-full',
            today:
              'text-[#4B4B4B] font-black border-2 border-[#4B4B4B] rounded-full',
          }}
          className='p-0 w-full'
          classNames={{
            month: 'w-full',
            caption: 'hidden',
            table: 'w-full border-collapse',
            head_row:
              'flex justify-between px-4 pb-2 border-b-[3px] border-[#4B4B4B]',
            head_cell: 'text-[#4B4B4B] font-bold text-xs w-8 uppercase',
            row: 'flex w-full justify-between px-4 py-2 border-b border-gray-300 last:border-0',
            cell: 'text-center p-0 relative [&:has([aria-selected])]:bg-transparent',
            day: 'h-8 w-8 p-0 font-bold text-lg text-[#4B4B4B] rounded-full hover:bg-gray-100 transition-colors',
            day_outside: 'invisible',
          }}
        />
      </div>

      <div className='w-80 space-y-3'>
        <h3 className='font-bold text-[#4B4B4B]'>Recordatorios del mes</h3>

        {reminders.length === 0 && (
          <p className='text-sm text-gray-500 italic text-center py-4'>
            No hay vacunas programadas para este mes.
          </p>
        )}

        {reminders.map((rem) => (
          <div
            key={rem.id}
            className={`p-3 rounded-xl flex items-center gap-3 text-[#4B4B4B] shadow-sm transition-transform hover:scale-[1.02] ${
              rem.color === 'orange' ? 'bg-[#FDAA68]' : 'bg-[#98D8C8]'
            }`}
          >
            {/* Imagen o Emoji */}
            <div className='bg-white p-0.5 rounded-full w-12 h-12 flex items-center justify-center shrink-0 border-2 border-[#4B4B4B] overflow-hidden'>
              {rem.petImage ? (
                <img
                  src={rem.petImage}
                  alt={rem.petName}
                  className='w-full h-full object-cover rounded-full'
                />
              ) : (
                <span className='text-xl'>
                  {rem.color === 'orange' ? '🐱' : '🐶'}
                </span>
              )}
            </div>

            {/* Info */}
            <div className='flex flex-col w-full gap-1 overflow-hidden'>
              <span className='font-bold text-white text-sm truncate'>
                {rem.petName}
              </span>
              <div
                className={`text-xs px-2 py-0.5 rounded-md font-medium w-fit ${
                  rem.color === 'orange' ? 'bg-[#FFE4D1]' : 'bg-[#D1F2EB]'
                }`}
              >
                {rem.task}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
