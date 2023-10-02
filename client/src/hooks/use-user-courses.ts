import { CourseStateValue } from '@/models/course';
import { TransformedCourse } from '@/types/course';

export const useUserCourses = (course: TransformedCourse) => {
  return {
    data: {
      state: 'pending' as CourseStateValue,
    },
  };
};
