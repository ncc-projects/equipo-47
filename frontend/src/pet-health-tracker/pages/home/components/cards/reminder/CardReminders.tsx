import Cat from '@/assets/pets/cat.png';
import Rabbit from '@/assets/pets/rabbit.png';
import { CardReminder } from './CardReminder';

export const CardReminders = () => {
  return (
    <div className='p-4 bg-white rounded-lg'>
      <h3 className='font-bold ml-2 mb-2'>Recordatorios</h3>

      <div className='flex flex-col gap-2'>
        <CardReminder
          img={Cat}
          name='Chihiro'
          vaccination='Próxima vacunación en 125 días'
          deworming='Próxima desparasitación en 23 días'
        />
        <CardReminder
          img={Rabbit}
          name='Jacinto'
          vaccination='Próxima vacunación en 125 días'
          deworming='Próxima desparasitación en 23 días'
        />
      </div>
    </div>
  );
};
