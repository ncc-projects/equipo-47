import { FaRegStar, FaStar } from 'react-icons/fa';

interface Props {
  name: string;
  description: string;
  distance?: string;
}

export const CardService = ({ name, description, distance }: Props) => {
  return (
    <div className='nth-[2n]:bg-[#4A4B4B] nth-[2n+1]:bg-secondary p-2 text-white w-1/2 rounded-lg flex flex-col gap-5'>
      <div>
        <h4 className='font-medium text-[15px]'>{name}</h4>
        <div className='flex'>
          {Array.from({ length: 4 }, (_, index) => (
            <FaStar key={index} className='text-primary' />
          ))}
          <FaRegStar className='text-primary' />
        </div>
      </div>

      <section>
        <p className='text-sm'>{description}</p>
        {distance && <p className='text-sm'>{distance}</p>}
      </section>
    </div>
  );
};
