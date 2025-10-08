type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = 'primary',
  size = 'sm',
  onClick,
  children,
  disabled = false,
  ...props
}: ButtonProps) {
  const base =
    'rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200';

  const variants = {
    primary: 'bg-green text-white hover:bg-green-secondary',
    secondary: 'text-black bg-grey-secondary hover:bg-green hover:text-white',
    tertiary: 'border border-grey-secondary hover:border-green',
  };

  const sizes = {
    sm: 'p-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-2xl',
  };

  const disabledClass = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabledClass}`}
    >
      {children}
    </button>
  );
}
