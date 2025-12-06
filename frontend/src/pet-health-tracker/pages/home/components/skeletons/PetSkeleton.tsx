export const PetSkeleton = () => {
  return (
    <div className='p-4 bg-gray-100 rounded-lg animate-pulse'>
      <h3 className='font-bold mb-2 h-7 w-1/3 rounded-lg bg-gray-200 animate-pulse' />

      <div className='flex gap-3 w-[calc(100svw-64px)] overflow-x-scroll whitespace-nowrap snap-x snap-mandatory pb-2'>
        {Array.from({ length: 2 }, (_, index) => (
          <div
            key={index}
            className='shrink-0 bg-gray-200 p-2 text-white rounded-lg h-46 w-46 snap-center flex flex-col gap-2 animate-pulse'
          />
        ))}
      </div>
    </div>
  );
};
