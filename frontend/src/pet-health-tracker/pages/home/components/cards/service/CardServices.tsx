import { CardService } from './CardService';

export const CardServices = () => {
  return (
    <div className='p-4 bg-white rounded-lg'>
      <h3 className='font-bold ml-2 mb-2'>Servicios cercanos</h3>

      <div className='flex gap-3'>
        <CardService
          name='Peluqueria Canina'
          description='Servicio de corte y lavado'
          distance='1,3 km de tu ubicación'
        />
        <CardService
          name='Alimento Balanceado'
          description='Alimento y accesorios para
tus mascotas'
        />
      </div>
    </div>
  );
};
