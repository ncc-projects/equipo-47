import type { RefObject } from 'react';

interface Props {
  img: string;
  imgClass: string;
  title?: string;
  titleClass?: string;
  subtitle?: string;
  subtitleClass?: string;
  description?: string;
  descriptionClass?: string;
  onRemoveImage?: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

export const UploadImage = ({
  img,
  title,
  titleClass,
  subtitle,
  subtitleClass,
  description,
  descriptionClass,
  imgClass,
  onRemoveImage,
  fileInputRef,
}: Props) => {
  return (
    <header className='flex flex-col justify-center items-center mb-5'>
      <div className='relative group cursor-pointer'>
        {/* IMAGEN */}
        <img
          src={img}
          alt='pet'
          className={`object-cover overflow-hidden rounded-lg ${imgClass}`}
        />

        {/* X para borrar */}
        {onRemoveImage && (
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onRemoveImage();
            }}
            className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg shadow-md z-20'
          >
            ×
          </button>
        )}

        {/* OVERLAY al hacer hover */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-sm rounded-lg'
        >
          Cambiar imagen
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          className='absolute sm:hidden inset-0 bg-black/40 opacity-50 transition-opacity flex items-center justify-center text-white font-semibold text-sm rounded-lg'
        >
          <span>Cambiar imagen</span>
        </div>
      </div>

      {/* Títulos */}
      <section className='relative flex mt-3'>
        <div className='flex flex-col justify-center items-center'>
          {title && (
            <h1 className={`font-bold text-3xl ${titleClass}`}>{title}</h1>
          )}
          {subtitle && (
            <h2 className={`font-medium text-xl ${subtitleClass}`}>
              {subtitle}
            </h2>
          )}
        </div>
      </section>

      {description && (
        <p className={`text-lg ${descriptionClass}`}>{description}</p>
      )}

      {/* Input oculto */}
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
      />
    </header>
  );
};
