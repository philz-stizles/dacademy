// 'use client';

import Image from 'next/image';
import { shortenText } from '@/utils/typography';
import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { TransformedCourse } from '@/types/course';
import { Avatar, Badge, IconButton, Rating } from '../..';
import { Heart } from 'lucide-react';

type Props = {
  course: TransformedCourse;
  progress?: number | null;
  Footer?: () => JSX.Element;
};

const CourseCard = ({ progress, course, Footer }: PropsWithChildren<Props>) => {
  // const changeRatingHandler = useCallback(() => {}, []);

  const { id, title, slug, coverImage, price } = course;

  return (
    // <div className="flex flex-col items-start relative max-w-lg min-w-[17rem]">
    // {`/market-place/${slug}`}
    <Link
      href={`/market/${slug}`}
      className="course-card rounded-3xl bg-white p-2.5"
    >
      <figure className="relative rounded-3xl overflow-hidden aspect-video">
        <Image
          src={coverImage as string}
          alt="Course Cover"
          fill
          className="object-cover rounded-3xl"
        ></Image>
        <IconButton
          variant="white"
          className="absolute top-1 right-1"
          icon={Heart}
        />
      </figure>

      <div className="p-1.5 space-y-2">
        <Badge>frontend</Badge>
        <h6 className=" text-sm font-semibold mt-2 mb-1">
          {shortenText(title, 100)}
        </h6>
        <div className="flex justify-between items-center">
          <Rating /> <div className="text-sm">{`${price}`}</div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar />
          <div className="flex flex-col">
            <p className="text-slate-900 text-sm font-medium">
              Theophilus Ighalo
            </p>
            <small className="text-slate-400 font-medium">Mentor</small>
          </div>
        </div>

        {Footer && <Footer />}
      </div>
    </Link>
  );
};

export default CourseCard;
