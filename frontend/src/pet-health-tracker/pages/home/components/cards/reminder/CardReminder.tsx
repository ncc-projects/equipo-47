interface Props {
  img: string;
  name: string;
  deworming: string;
  vaccination: string;
}

export const CardReminder = ({ deworming, img, name, vaccination }: Props) => {
  return (
    <div className='bg-primary flex justify-between items-center gap-1 p-2 rounded-lg'>
      <div className='flex justify-center items-center py-2 gap-1'>
        <img src={img} alt={name} className='h-14 w-14 object-contain' />
        <h4 className='font-medium text-white'>{name}</h4>
      </div>
      <div className='flex flex-col gap-1 text-xs'>
        <p className='bg-footer px-1 py-0.5 rounded-sm'>{deworming}</p>
        <p className='bg-footer px-1 py-0.5 rounded-sm'>{vaccination}</p>
      </div>
    </div>
  );
};
