import { Attachment, Chapter, Course } from '.prisma/client';

export type AuthorCourse = Course & {
  attachments: Attachment[];
  chapters: Chapter[];
};
