import { getCategories } from '@/actions/categories';
import { getCourses } from '@/actions/courses';
import { HomeLayout } from '@/components/layouts';
import { CourseSection } from '@/components/shared';
import { Category } from '@/types/category';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Categories, Instructors, Jumbotron, WhoAreYou } from '@/components/home';
import { TransformedCourse } from '@/models/course';

export default function Home({
  categories,
  courses,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Jumbotron />
      <Categories />
      <CourseSection title="Featured Courses" courses={courses} />
      <WhoAreYou />
      <Instructors />
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

type Props = {
  categories: Category[];
  courses: TransformedCourse[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const categories = await getCategories();
  const courses = await getCourses({ limit: 3 });

  return {
    props: {
      categories,
      courses,
    },
  };
};
