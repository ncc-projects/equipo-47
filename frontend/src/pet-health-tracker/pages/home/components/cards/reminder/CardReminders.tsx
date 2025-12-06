import Cat from '@/assets/pets/cat.png';
import { CardReminder } from './CardReminder';
import type { VaccinationEvents } from '../../../interfaces/vaccination-events.interface';
import { getDaysUntil } from '@/utils/getDaysUntil';

interface Props {
  vaccinateEvents: VaccinationEvents[];
}

export const CardReminders = ({ vaccinateEvents }: Props) => {
  return (
    <div className='p-4 bg-white rounded-lg'>
      <h3 className='font-bold ml-2 mb-2'>Recordatorios</h3>

      <div className='flex flex-col gap-2'>
        {vaccinateEvents.map((vaccinate) => (
          <CardReminder
            key={vaccinate.id}
            img={Cat}
            name='Chihiro'
            vaccination={getDaysUntil(vaccinate.scheduledDate) || 0}
            deworming='Próxima desparasitación en 23 días'
          />
        ))}
      </div>
    </div>
  );
};
