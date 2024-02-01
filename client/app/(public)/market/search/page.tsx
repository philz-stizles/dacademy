import { getCourses } from '@/actions/courses';
import { Container } from '@/components/shared';
import { IconButton } from '@/components/ui/custom';
import { CourseCard } from '@/components/ui/custom/cards';
import { Filter } from 'lucide-react';

const MarketSearchPage = async () => {
  const courses = await getCourses({
    filter: {
      isPublished: true,
    },
  });

  return (
    <div className="">
      <Container className="space-y-6">
        <h2 className="text-2xl font-bold">{courses.length} result for </h2>
        <div>
          <IconButton icon={Filter} />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div></div>
          <div className="col-span-3 grid grid-cols-3 gap-4">
            {courses.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MarketSearchPage;
