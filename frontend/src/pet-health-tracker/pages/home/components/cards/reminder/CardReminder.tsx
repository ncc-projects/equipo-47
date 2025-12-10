interface Props {
  img: string;
  name: string;
  deworming?: string;
  vaccination: number;
}

export const CardReminder = ({ deworming, img, name, vaccination }: Props) => {
  let vaccinationText = '';

  if (vaccination === 0) vaccinationText = 'Próxima vacunación hoy';
  else if (vaccination === 1) vaccinationText = 'Próxima vacunación mañana';
  else if (vaccination < 0) vaccinationText = 'Su vacunación ya pasó';
  else vaccinationText = `Próxima vacunación en ${vaccination} días`;

  return (
    <div className='bg-primary flex justify-between items-center gap-1 p-2 rounded-lg'>
      <div className='flex justify-center items-center py-2 gap-1'>
        <img src={img} alt={name} className='h-14 w-14 object-contain' />
        <h4 className='font-medium text-white'>{name}</h4>
      </div>
      <div className='flex flex-col gap-1 text-xs'>
        {deworming && (
          <p className='bg-footer px-1 py-0.5 rounded-sm'>{deworming}</p>
        )}

        <p className='bg-footer px-1 py-0.5 rounded-sm'>{vaccinationText}</p>
      </div>
    </div>
  );
};
