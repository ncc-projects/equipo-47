import { CardPet } from './CardPet';
import Cat from '@/assets/pets/cat.png';
import type { Pet } from '../../../interfaces/pets.interface';
import { calculateAgeDetail } from '@/utils/calculateAgeDetail';

interface Props {
  pets: Pet[];
}

export const CardPets = ({ pets }: Props) => {
  return (
    <div className='p-4 bg-white rounded-lg'>
      <h3 className='font-bold ml-2 mb-2'>Tus mascotas</h3>

      <div className='flex gap-3 w-[calc(100svw-64px)] overflow-x-scroll whitespace-nowrap snap-x snap-mandatory pb-2'>
        {pets.map((pet) => (
          <CardPet
            key={pet.id}
            img={pet.profileImageUrl || Cat}
            name={pet.name || 'Chihiro'}
            birthDate={calculateAgeDetail(pet.birthDate!) || '2 años y 3 meses'}
            weight={pet.weight || 0}
            vaccination='vacunación al día'
          />
        ))}
      </div>
    </div>
  );
};
