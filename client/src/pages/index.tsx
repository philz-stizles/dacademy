import { getCategories } from '@/actions/categories';
import { getCourses } from '@/actions/courses';
import { HomeLayout } from '@/components/layouts';
import { CourseSection } from '@/components/shared';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  Categories,
  Instructors,
  Jumbotron,
  WhoAreYou,
} from '@/components/home';
import { TransformedCourse } from '@/types/course';
import { TransformedCategory } from '@/types/category';

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
  categories: TransformedCategory[];
  courses: TransformedCourse[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (_) => {
  const categories = await getCategories({});
  const courses = await getCourses({ filter: { isPublished: true }, limit: 3 });

  return {
    props: {
      categories,
      courses,
    },
  };
};
