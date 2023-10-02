import { CourseCard } from '@/components/ui/custom/cards';
import Container from '../container/container';
import { TransformedCourse } from '@/types/course';
import clsx from 'clsx';

type Props = {
  title: string;
  subTitle?: string;
  courses: Omit<TransformedCourse, 'wsl' | 'chapters' | 'attachments'>[];
  cols?: number;
  className?: string;
};

const CourseSection = ({ className, title, subTitle, courses, cols = 3 }: Props) => {
  const gridCols =
    cols === 2
      ? 'grid-cols-2'
      : cols === 3
      ? 'grid-cols-3'
      : cols === 4
      ? 'grid-cols-4'
      : 'grid-cols-3';

  return (
    <section className={clsx(className)}>
      <Container>
        <h3 className="font-semibold text-xl mb-3">{title}</h3>
        {subTitle && <h5>{subTitle}</h5>}
        <div className={`grid ${gridCols} gap-3`}>
          {courses.map((item) => (
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.title}
              slug={item.slug}
              coverImage={item.coverImage!}
              // chaptersLength={item.chapters.length}
              price={item.price!}
              category={item?.category?.title!}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CourseSection;
