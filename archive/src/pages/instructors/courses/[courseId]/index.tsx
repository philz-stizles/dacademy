import { getCategories } from '@/actions/categories';
import { getAuthorCourse } from '@/actions/courses';
import {
  AttachmentForm,
  CategoryForm,
  ChaptersForm,
  DescriptionForm,
  ImageForm,
  PriceForm,
  TitleForm,
} from '@/components/course';
import Actions from '@/components/course/actions/actions';
import { DashboardLayout } from '@/components/layouts';
import { Banner, IconBadge } from '@/components/ui/custom';
import { TransformedCategory } from '@/types/category';
import { TransformedAuthorCourse } from '@/types/course';
import {
  ArrowLeft,
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from 'lucide-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

const CourseEditPage = ({
  course,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const requiredFields = [
    course.title,
    course.description,
    course.coverImage,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="py-6">
        <Link
          href={'/instructors/courses'}
          className="inline-flex items-center text-sm hover:opacity-75 transition mb-6 bg-muted rounded-lg py-1 px-3"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to courses
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Course setup</h1>
            <span className="text-sm text-slate-600">
              Complete all fields {completionText} to publish your new course.
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={course.id}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-lg text-sky-700 font-semibold">
                Customize your course
              </h2>
            </div>
            <TitleForm title={course.title!} courseId={course.id!} />
            <DescriptionForm
              description={course.description!}
              courseId={course.id!}
            />
            <ImageForm imageUrl={course.coverImage!} courseId={course.id!} />
            <CategoryForm
              categoryId={course.categoryId!}
              courseId={course.id!}
              options={categories.map((category) => ({
                label: category.title,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm chapters={course.chapters!} courseId={course.id!} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm price={course.price!} courseId={course.id!} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm
                attachments={course.attachments!}
                courseId={course.id!}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CourseEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

type ServerSideProps = {
  course: TransformedAuthorCourse;
  categories: TransformedCategory[];
};

interface Params extends ParsedUrlQuery {
  courseId?: string;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const { courseId } = ctx.params as Params;
  const course = await getAuthorCourse(courseId!);
  const categories = await getCategories({});

  if (!course) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      course,
      categories,
    },
  };
};

export default CourseEditPage;
