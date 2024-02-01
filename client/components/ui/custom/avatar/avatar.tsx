import Image from 'next/image';
import defaultAvatar from '/public/images/placeholder.jpg';
import { cn } from '@/lib/utils';

type AvatarProps = {
  src?: string | null | undefined;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, className }) => {
  return (
    <Image
      className={cn('rounded-full border-2 border-white', className)}
      width={30}
      height={30}
      src={src || defaultAvatar}
      alt="Avatar"
    />
  );
};

export default Avatar;
