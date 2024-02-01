import {
  User,
  SubCategory,
  Attachment,
  Chapter,
  Course,
  Wsl,
  MuxData,
} from '.prisma/client';

export type FullChapter = Chapter & {
  muxData: MuxData | null;
};

export type FullCourse = Course & {
  author: User;
  category: SubCategory;
  attachments: Attachment[];
  chapters: FullChapter[];
  wsl: Wsl[];
};

export type TransformedSubCategory = Omit<
  SubCategory,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string;
  updatedAt: string;
};

export type TransformedUser = {
  id: string;
  email: string;
  name: string | null;

  createdAt: string;
  updatedAt: string;
};

export type TransformedChapter = Omit<Chapter, 'createdAt' | 'updatedAt'> & {
  createdAt: string | Date;
  updatedAt: string | Date;
  muxData: MuxData | null;
};

export type TransformedAttachment = Omit<
  Attachment,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type TransformedCourse = Omit<
  FullCourse,
  | 'createdAt'
  | 'updatedAt'
  | 'attachments'
  | 'chapters'
  | 'wsl'
  | 'category'
  | 'author'
> & {
  author?: TransformedUser;
  category?: TransformedSubCategory | null;
  attachments?: TransformedAttachment[];
  chapters?: TransformedChapter[];
  wsl?: Wsl[];
  createdAt: string;
  updatedAt: string;
};

export type AuthorCourse = Course & {
  attachments: Attachment[];
  chapters: Chapter[];
};

export type TransformedAuthorCourse = Omit<
  AuthorCourse,
  'createdAt' | 'updatedAt' | 'attachments' | 'chapters'
> & {
  createdAt: string;
  updatedAt: string;
  attachments: TransformedAttachment[];
  chapters: TransformedChapter[];
};
