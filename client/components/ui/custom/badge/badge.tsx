import { cn } from '@/lib/utils';
import { Size, Variant } from '@/types/styles';
import { useMemo } from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
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
  primary: 'bg-indigo-50 border-indigo-400',
  secondary: '',
  white: 'bg-white border-white',
  flat: 'border border-transparent',
};

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
}: Props) => {
  const classNames = useMemo(
    () =>
      cn(
        'text-xs capitalize border rounded-md px-1 py-0.5',
        Variants[variant],
        Sizes[size],
        className
      ),
    [className, size, variant]
  );
  return <small className={classNames}>{children}</small>;
};

export default Badge;
