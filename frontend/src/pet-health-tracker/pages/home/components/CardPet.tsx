interface Props {
  img: string;
  name: string;
  birthDate: string;
  weight: string;
  vaccination: string;
}

export const CardPet = ({
  name,
  birthDate,
  weight,
  vaccination,
  img,
}: Props) => {
  return (
    <div className='nth-[2n]:bg-primary nth-[2n+1]:bg-secondary p-2 text-white w-1/2 rounded-lg'>
      <img src={img} alt={name} className='h-14 w-14 object-contain' />
      <h4 className='font-medium'>{name}</h4>
      <ul className='text-sm'>
        <li>{birthDate}</li>
        <li>{weight}</li>
        <li>{vaccination}</li>
      </ul>
    </div>
  );
};
