import { cn } from '@/lib/utils';
import { Size, Variant } from '@/types/styles';
import { LucideIcon } from 'lucide-react';
import { useMemo } from 'react';

type Props = {
  className?: string;
  rounded?: boolean;
  outlined?: boolean;
  badge?: string;
  icon: LucideIcon;
  variant?: Variant;
  size?: Size;
};

const Sizes: { [key: string]: string } = {
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
};

const Variants: { [key: string]: string } = {
  primary: '',
  secondary: '',
  white: 'text-white',
  dark: 'text-slate-800',
  flat: '',
};

const IconButton = ({
  className,
  icon: Icon,
  rounded = true,
  outlined = false,
  size = 'md',
  variant = 'flat',
  badge,
}: Props) => {
  const classNames = useMemo(
    () =>
      cn(
        'relative border border-transparent p-1.5 flex flex-col justify-center items-center',
        rounded && 'rounded-full',
        outlined && 'border-neutral-900',
        className,
        Variants[variant],
        Sizes[size]
      ),
    [className, outlined, rounded, size, variant]
  );
  return (
    <button className={classNames}>
      <Icon size={22} />
      {badge && (
        <span className="absolute -top-0.5 -right-1.5 text-xs bg-indigo-600 rounded-full w-5 h-5 text-white flex items-center justify-center text-center font-medium shadow-sm">
          {badge}
        </span>
      )}
    </button>
  );
};

export default IconButton;
