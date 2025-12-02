import { CardPet } from './CardPet';
import Cat from '@/assets/pets/cat.png';
import Rabbit from '@/assets/pets/rabbit.png';

export const CardPets = () => {
  return (
    <div className='p-4 bg-white rounded-lg'>
      <h3 className='font-bold ml-2 mb-2'>Tus mascotas</h3>

      <div className='flex gap-3'>
        <CardPet
          img={Cat}
          name='Chihiro'
          birthDate='2 años y 3 meses'
          weight='8 kilos'
          vaccination='vacunación al día'
        />
        <CardPet
          img={Rabbit}
          name='Jacinto'
          birthDate='1 año y 2 meses'
          weight='4 kilos'
          vaccination='vacunación al día'
        />
      </div>
    </div>
  );
};
