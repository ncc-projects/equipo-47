import { Link } from 'react-router';

import homeIcon from '@/assets/icons/home.png';
import heartIcon from '@/assets/icons/heart.png';
import calendarIcon from '@/assets/icons/calendar.png';
import personIcon from '@/assets/icons/person.png';
import petIcon from '@/assets/icons/pet.png';

export const Footer = () => {
  return (
    <footer className='fixed bottom-0 left-0 w-full h-20 bg-footer border-t-3 border-[#515C5E] shadow-lg z-50'>
      <nav className='h-full w-full max-w-md mx-auto *:cursor-pointer'>
        <ul className='flex justify-between items-center h-full px-6'>
          <li className='flex justify-center'>
            <Link to='/'>
              <img
                src={homeIcon}
                alt='Home'
                className='h-12 w-12 object-contain hover:scale-110 transition-transform'
              />
            </Link>
          </li>

          <li className='flex justify-center'>
            <Link to='/health'>
              <img
                src={heartIcon}
                alt='Salud'
                className='h-12 w-12 object-contain hover:scale-110 transition-transform'
              />
            </Link>
          </li>

          <li className='flex justify-center relative'>
            <Link to='/calendar' className='relative'>
              <img
                src={calendarIcon}
                alt='Calendario'
                className='w-21 object-contain -mt-14 hover:-translate-y-1 transition-transform'
              />
            </Link>
          </li>

          <li className='flex justify-center'>
            <Link to='/profile'>
              <img
                src={personIcon}
                alt='Perfil'
                className='h-12 w-12 object-contain hover:scale-110 transition-transform'
              />
            </Link>
          </li>

          <li className='flex justify-center'>
            <Link to='/pets/nuevo'>
              <img
                src={petIcon}
                alt='Mascotas'
                className='h-12 w-12 object-contain hover:scale-110 transition-transform'
              />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
