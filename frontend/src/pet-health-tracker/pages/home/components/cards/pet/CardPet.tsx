import { Link } from 'react-router';

interface Props {
  petId: number;
  img: string;
  name: string;
  birthDate: string;
  weight: number;
  vaccination: string;
}

export const CardPet = ({
  petId,
  name,
  birthDate,
  weight,
  vaccination,
  img,
}: Props) => {
  return (
    <Link
      to={`/pets/perfil/${petId}`}
      className='shrink-0 even:bg-primary odd:bg-secondary p-2 text-white rounded-lg h-46 w-46 snap-center flex flex-col gap-2'
    >
      <img src={img} alt={name} className='h-14 w-14 object-contain' />
      <h4 className='font-medium'>{name}</h4>
      <ul className='text-sm'>
        <li>{birthDate}</li>
        <li>{weight} kg</li>
        <li>{vaccination}</li>
      </ul>
    </Link>
  );
};
