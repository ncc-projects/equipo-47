import Cat from '@/assets/pets/cat.png';
import { CardReminder } from './CardReminder';
import { getDaysUntil } from '@/utils/getDaysUntil';
import type { VaccineEvents } from '../../../interfaces/vaccination-events.interface';

interface Props {
  vaccinateEvents: VaccineEvents[];
}

export const CardReminders = ({ vaccinateEvents }: Props) => {
  return (
    <div className='p-4 bg-white rounded-lg'>
      <h3 className='font-bold ml-2 mb-2'>Recordatorios</h3>

      <div className='flex flex-col gap-2'>
        {vaccinateEvents.map((vaccinate) => (
          <CardReminder
            key={vaccinate.id}
            img={vaccinate.pet?.profileImageUrl || Cat}
            name={vaccinate.pet?.name || 'Mascota'}
            vaccination={getDaysUntil(vaccinate.scheduledDate) || 0}
            // deworming='Próxima desparasitación en 23 días'
          />
        ))}
      </div>
    </div>
  );
};
