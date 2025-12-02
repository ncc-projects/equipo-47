interface Props {
  name: string;
}

export const CardProfile = ({ name }: Props) => {
  return (
    <section className='flex justify-center items-center gap-4 bg-white p-2 rounded-lg'>
      <div className='flex flex-col justify-center items-center'>
        <img
          src='/src/assets/pets.png'
          alt='logo'
          className='w-14 h-14 object-cover'
        />
        <h1 className='text-center text-base'>Pet Health Tracker</h1>
      </div>

      <div>
        <h2>Hola {name}!</h2>
        <span>Veamos qué necesitan hoy tus mascotas</span>
      </div>
    </section>
  );
};
