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
import { DashboardLayout } from '@/components/layouts';
import { IconBadge } from '@/components/ui/custom';
import { AuthorCourse } from '@/types/course';
import { Category } from '@prisma/client';
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from 'lucide-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';

const CourseEditPage = ({
  course,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      {/* {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )} */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              {/* Complete all fields {completionText} */}
            </span>
          </div>
          {/* <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          /> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
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
  course: AuthorCourse;
  categories: Category[];
};

interface Params extends ParsedUrlQuery {
  courseId?: string;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const { courseId } = ctx.params as Params;
  const course = await getAuthorCourse(courseId!);
  const categories = await getCategories();

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
