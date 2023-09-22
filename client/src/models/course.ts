import { Category, Course } from '@prisma/client';
import { Author } from './author';

export interface TransformedCourse
  extends Omit<Course, 'updatedAt' | 'createdAt' | 'authorId' | 'categoryId'> {
  author: Author;
  status?: CourseStatus;
  category: Category | null;
  link: string;
  wsl: string[];
  createdAt: string;
  updatedAt?: string;
}

export type CourseType = {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  author: Author;
  status?: CourseStatus;
};

enum CourseStatus {
  new,
  highestRated,
  bestseller,
}

export type CourseStateValue =
  | 'pending'
  | 'purchased'
  | 'activated'
  | 'deactivated';
