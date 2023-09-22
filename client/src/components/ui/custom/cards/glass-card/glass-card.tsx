import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const GlassCard = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        'rounded-md py-2 px-6 bg-[rgba(255,255,255,0.5)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.25]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
