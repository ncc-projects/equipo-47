import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const health = '/src/assets/pets/health.png';

export const HealthPage = () => {
  return (
    <div className='flex flex-col gap-13 mt-4'>
      <Header
        img={health}
        title='Salud'
        description='¿Qué necesitas registrar hoy?'
        descriptionClass='text-sm'
      />

      <div className='*:bg-[#FFE1CB] flex flex-col *:w-full gap-4 *:text-xl *:font-medium'>
        <Button variant='secondary'>
          <Link to='/pets/salud/nueva-vacuna' className='w-full'>
            Registrar Vacuna
          </Link>
        </Button>
        <Button variant='secondary'>Registrar Desparasitación</Button>
        <Button variant='secondary'>Registrar Anti Pulgas</Button>
      </div>
    </div>
  );
};
