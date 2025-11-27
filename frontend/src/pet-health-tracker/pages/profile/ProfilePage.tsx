import { Header } from '@/components/Header';
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb';
import { useParams } from 'react-router';

export const ProfilePage = () => {
  const { petId } = useParams();
  console.log('🚀 ~ ProfilePage ~ petId:', petId);

  // TODO: Endpoint GET information ByID

  // const { data } = usePetById(petId || '');

  // const {
  //   age,
  //   born,
  //   colors,
  //   food,
  //   neutered,
  //   ration,
  //   gender = true,
  //   weight,
  // } = data;

  const age = '';
  const born = '';
  const colors = '';
  const food = '';
  const neutered = '';
  const ration = '';
  const gender = true;
  const weight = '';

  return (
    <section className='w-full max-w-md flex flex-col gap-4 justify-center text-[#4A4B4B]'>
      <Header
        img='/src/assets/profile.png'
        imgClass='w-56 h-56'
        title='RAMEN'
        subtitle='Boyero de Berna'
        iconClass={gender ? 'bg-primary' : 'bg-pink-700'}
        icon={
          gender ? (
            <TbGenderMale className='w-8 h-8' />
          ) : (
            <TbGenderFemale className='w-8 h-8' />
          )
        }
      />
      <section className='bg-secondary/70 rounded-lg mx-6 flex flex-col gap-6 pb-15'>
        <h3 className='bg-[#FFE1CB] py-4 pl-3 text-base font-medium rounded-lg border border-secondary'>
          FICHA MÉDICA
        </h3>
        <ul className='px-3 *:text-xl *:font-medium *:align-middle'>
          <li>
            Nació:&nbsp;
            <span className='font-normal'>{born || '4 de Enero 2016'}</span>
          </li>
          <li>
            Edad:&nbsp;<span className='font-normal'>{age || '9 años'}</span>
          </li>
          <li>
            Peso:&nbsp;<span className='font-normal'>{weight || '15kg'}</span>
          </li>
          <li>
            Castrado:&nbsp;
            <span className='font-normal'>{neutered || 'si'}</span>
          </li>
          <li>
            Alimento:&nbsp;
            <span className='font-normal'>{ration || 'Royal Canin Adult'}</span>
          </li>
          <li>
            Ración diaria:&nbsp;
            <span className='font-normal'>{food || '300 gr.'}</span>
          </li>
        </ul>
        <section className='flex gap-3 pl-3'>
          <span className={`rounded-full w-9 h-9 bg-white ${colors}`} />
          <span className={`rounded-full w-9 h-9 bg-[#AB7D38] ${colors}`} />
          <span className={`rounded-full w-9 h-9 bg-black ${colors}`} />
        </section>
      </section>
    </section>
  );
};
