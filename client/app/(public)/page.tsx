import { getCourses } from '@/actions/courses';
import {
  Categories,
  Instructors,
  Jumbotron,
  Testimonials,
  TopCourses,
  TopLearners,
  WhoAreYou,
} from '@/components/home';
import { CourseSection } from '@/components/shared';
import { Fragment } from 'react';

const HomePage = async () => {
  const courses = await getCourses({
    filter: { isPublished: true },
    limit: 3,
  });

  return (
    <Fragment>
      <Jumbotron />
      <Categories />
      <CourseSection title="Featured Courses" courses={courses} cols={4} />
      <WhoAreYou />
      <Instructors />
      <TopCourses />
      <TopLearners />
      <Testimonials />
    </Fragment>
  );
};

export default HomePage;
