import { CourseStateValue } from '@/models/course';
import { TransformedCourse } from '@/types/course';

export const useUserCourses = (
  course: Omit<TransformedCourse, 'category' | 'author'>
) => {
  return {
    data: {
      state: 'pending' as CourseStateValue,
    },
  };
};
