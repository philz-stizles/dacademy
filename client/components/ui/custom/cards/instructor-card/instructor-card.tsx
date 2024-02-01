import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  className?: string;
  imageSrc: string;
  name: string;
  title: string;
};

const InstructorCard = ({ name, title, imageSrc, className }: Props) => {
  return (
    <div
      className={clsx(
        'text-center cursor-pointer border border-transparent transition',
        className
      )}
    >
      <Image
        className="rounded-md"
        src={imageSrc}
        alt=""
        width={300}
        height={300}
      />
      <div className="p-4">
        <h2 className="font-semibold">{name}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default InstructorCard;
