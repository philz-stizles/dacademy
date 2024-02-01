import { getChapter } from '@/actions/chapters';
import {
  ChapterAccessForm,
  ChapterActions,
  ChapterDescriptionForm,
  ChapterTitleForm,
  ChapterVideoForm,
} from '@/components/chapter';
import { DashboardLayout } from '@/components/layouts';
import { Banner, IconBadge } from '@/components/ui/custom';
import { TransformedChapter } from '@/types/course';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

const ChapterEditPage = ({ chapter }: ServerSideProps) => {
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="py-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/instructors/courses/${chapter.courseId}`}
              className="inline-flex items-center text-sm hover:opacity-75 transition mb-6 bg-muted rounded-lg py-1 px-3"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  Chapter Creation
                </h1>
                <span className="text-sm text-slate-600">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions disabled={!isComplete} initialData={chapter} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ChapterTitleForm initialData={chapter} />
              <ChapterDescriptionForm initialData={chapter} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <ChapterAccessForm initialData={chapter} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            <ChapterVideoForm initialData={chapter} />
          </div>
        </div>
      </div>
    </>
  );
};

ChapterEditPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

type ServerSideProps = {
  chapter: TransformedChapter;
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const { chapterId, courseId } = ctx.params as {
    chapterId: string;
    courseId: string;
  };
  const chapter = await getChapter(chapterId, courseId);

  if (!chapter) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      chapter,
    },
  };
};

export default ChapterEditPage;
