import { useModal } from '@/hooks/use-modal';
import { GetServerSideProps } from 'next';
import { getAuthorCourses } from '@/actions/courses';
import { DashboardLayout } from '@/components/layouts';
import DataTable from '@/components/course/data-table/data-table';
import { columns } from '@/components/course/data-table/_components/columns';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[[...nextauth]]';
import { TransformedCourse } from '@/types/course';

const InstructorCoursesPage = ({ courses }: Props) => {
  const { onOpen } = useModal();

  return (
    <>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Courses</h2>
        <p className="text-muted-foreground">
          Create & Manage Engaging Courses.
        </p>
      </div>
      <DataTable
        columns={columns}
        data={courses}
        onCreate={() => {
          onOpen('createCourse');
          // router.push('/instructors/2/courses/create');
        }}
      />
    </>
  );
};

InstructorCoursesPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

type Props = {
  courses: Omit<TransformedCourse, 'author' | 'category'>[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const courses = await getAuthorCourses(session.user.id);

  return {
    props: {
      courses,
    },
  };
};

export default InstructorCoursesPage;
