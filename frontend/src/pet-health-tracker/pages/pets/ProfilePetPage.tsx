import { Header } from '@/components/Header';
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router';
import { useGetPetByID } from './profile/hooks/useGetPetByID';
import { CustomButton } from '@/components/custom/CustomButton';
import { calculateAgeDetail } from '@/utils/calculateAgeDetail';
import { formatDate } from '@/utils/formatDate';
import { deletePetByIDAction } from './profile/actions/deletePetByID.action';
import { toast } from 'sonner';

export const ProfilePetPage = () => {
  const { petId } = useParams();
  const navigate = useNavigate();

  const { data } = useGetPetByID(petId || '');

  const age = calculateAgeDetail(data?.birthDate || '');

  const born = formatDate(data?.birthDate || '');

  const handleDelete = async () => {
    if (!petId) return;

    try {
      await deletePetByIDAction(petId);

      toast.success('Se eliminó la mascota correctamente', {
        position: 'top-center',
      });

      navigate('/');
    } catch (error) {
      console.error('🚀 ~ handleDelete ~ error:', error);
      toast.error('No se pudo eliminar la mascota');
    }
  };

  return (
    <section className='w-full max-w-md flex flex-col gap-4 justify-center text-[#4A4B4B]'>
      <Header
        img='/src/assets/profile.png'
        imgClass='w-56 h-56'
        title={data?.name ?? ''}
        subtitle={data?.breed ?? ''}
        iconClass={data?.gender ? 'bg-primary' : 'bg-pink-700'}
        icon={
          data?.gender ? (
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
            Edad:&nbsp;
            <span className='font-normal'>{age || '9 años'}</span>
          </li>
          <li>
            Peso:&nbsp;
            <span className='font-normal'>{data?.weight || '15kg'}kg</span>
          </li>
          <li>
            Castrado:&nbsp;
            <span className='font-normal'>
              {data?.neutered === true ? 'sí' : 'No'}
            </span>
          </li>
          <li>
            Alimento:&nbsp;
            <span className='font-normal'>
              {data?.breed || 'Royal Canin Adult'}
            </span>
          </li>
          <li>
            Ración diaria:&nbsp;
            <span className='font-normal'>{data?.feeding || '300 gr.'}</span>
          </li>
        </ul>
        <section className='flex gap-3 pl-3'>
          <span className={`rounded-full w-9 h-9 bg-white ${data?.color}`} />
          <span
            className={`rounded-full w-9 h-9 bg-[#AB7D38] ${data?.color}`}
          />
          <span className={`rounded-full w-9 h-9 bg-black ${data?.color}`} />
        </section>
      </section>
      <section className='flex flex-col gap-3 *:bg-[#FFE1CB] *:text-xl *:font-medium mt-4'>
        <CustomButton>
          <Link to={`/pets/${petId}`}>Editar mascota</Link>
        </CustomButton>
        <CustomButton onClick={handleDelete}>Eliminar mascota</CustomButton>
      </section>
    </section>
  );
};
