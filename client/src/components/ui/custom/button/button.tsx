import { LucideIcon } from 'lucide-react';
import { MouseEvent, PropsWithChildren } from 'react';

type Size = 'sm' | 'md' | 'lg';

type Props = {
  className?: string;
  block?: boolean;
  alignStart?: boolean;
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: Size;
  disabled?: boolean;
  outlined?: boolean;
  icon?: LucideIcon;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  block = false,
  alignStart = false,
  label,
  type = 'button',
  size = 'md',
  disabled,
  outlined,
  icon: Icon,
  onClick,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <button
      type={type}
      className={`flex items-center gap-2 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed transition hover:opacity-80 border-[1px] border-black
      ${block ? 'w-full' : ''}
      ${alignStart ? 'justify-start' : 'justify-center'}
      ${outlined ? 'bg-white' : 'bg-black'}
        ${outlined ? 'text-black' : 'text-white'}
        ${size === 'sm' && 'py-1 text-xs font-light'}
        ${size === 'md' && 'py-2 px-3 text-sm font-semibold'}
        ${size === 'lg' && 'text-lg font-bold'}
       `}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon size={24} />}
      {children || label}
    </button>
  );
};

export default Button;
