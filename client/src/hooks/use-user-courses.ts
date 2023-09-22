import { CourseStateValue, TransformedCourse } from '@/models/course';

export const useUserCourses = (course: TransformedCourse) => {
  return {
    data: {
      state: 'pending' as CourseStateValue,
    },
  };
};
