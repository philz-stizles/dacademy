import Image from 'next/image';
import { shortenText } from '@/utils/typography';
import { PropsWithChildren } from 'react';
import Link from 'next/link';

type Props = {
  id: string;
  title: string;
  price: number;
  progress?: number | null;
  category: string;
  coverImage: string;
  slug: string;
  Footer?: () => JSX.Element;
};

const CourseCard = ({
  title,
  price,
  coverImage,
  slug,
  Footer,
}: PropsWithChildren<Props>) => {
  // const changeRatingHandler = useCallback(() => {}, []);

  return (
    // <div className="flex flex-col items-start relative max-w-lg min-w-[17rem]">
    <Link href={`/courses/${slug}`} className="course-card">
      <figure className="relative">
        <Image
          src={coverImage as string}
          alt="Course Cover"
          fill
          objectFit="cover"
        ></Image>
      </figure>

      <div className="content">
        <h6 className=" text-sm font-semibold mt-2 mb-1">
          {shortenText(title, 40)}
        </h6>
        <div className="text-xs text-gray-500 font-normal mb-1">
          Theophilus Ighalo
        </div>
        {/* <Rating /> */}
        <div className="text-sm">{`${price}`}</div>
        {Footer && <Footer />}
      </div>
    </Link>
  );
};

export default CourseCard;

// --border-color: rgba(0,0,0,.03);
// box-shadow: 0 0 0 1px var(--border-color),0 2px 4px rgba(0,0,0,.05),0 12px 24px rgba(0,0,0,.05);
// max-width: 290px;
// border-radius: 6px;
// min-width: 220px;
// position: absolute;
// transition: transform .5s ease;
