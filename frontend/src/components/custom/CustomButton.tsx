export const CustomButton = ({
  className,
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <button
      className={`rounded-lg py-4 bg-primary w-full cursor-pointer ${className}`}
      {...props}
    />
  );
};
