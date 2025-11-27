import type { JSX } from 'react';

interface Props {
  img: string;
  imgClass: string;
  icon?: JSX.Element;
  iconClass?: string;
  title?: string;
  titleClass?: string;
  subtitle?: string;
  subtitleClass?: string;
  description?: string;
  descriptionClass?: string;
}

export const Header = ({
  img,
  icon,
  iconClass,
  description,
  title,
  titleClass,
  subtitle,
  subtitleClass,
  descriptionClass,
  imgClass,
}: Props) => {
  return (
    <header className='flex flex-col justify-center items-center mb-5'>
      <img
        src={img}
        alt={(title || description || subtitle) && 'pets'}
        className={`object-cover ${imgClass}`}
      />
      <section className='relative flex'>
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
        {icon && (
          <div
            className={`w-11 h-11 text-white absolute -right-13 top-2 rounded-full p-0.5 flex justify-center items-center ${iconClass}`}
          >
            {icon}
          </div>
        )}
      </section>
      {description && (
        <p className={`text-lg ${descriptionClass}`}>{description}</p>
      )}
    </header>
  );
};
