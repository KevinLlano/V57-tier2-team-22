type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function Button({
  variant = 'primary',
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  const base =
    'rounded p-2 text-sm md:text-base font-semibold md:py-2.5 md:px-4 flex items-center gap-2';

  const variants = {
    primary: 'bg-green text-white hover:bg-green-secondary',
    secondary: 'text-black bg-grey-secondary hover:bg-green hover:text-white',
    tertiary: 'border border-grey-secondary hover:border-green',
  };

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button 
      onClick={disabled ? undefined : onClick} 
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabledClass}`}
    >
      {children}
    </button>
  );
}
