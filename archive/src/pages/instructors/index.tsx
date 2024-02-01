import { getAnalytics } from '@/actions/courses';
import { DashboardLayout } from '@/components/layouts';
import { Chart } from '@/components/ui/custom';
import { DataCard } from '@/components/ui/custom/cards';
import { NextPageWithLayout } from '@/pages/_app';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[[...nextauth]]';

type Props = NextPageWithLayout & {
  totalRevenue: number;
  totalSales: number;
  data: any;
};

const OverviewPage = ({ totalRevenue, totalSales, data }: Props) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <DataCard label="Courses" value={totalRevenue} shouldFormat />
        <DataCard label="Total Revenue" value={totalSales} />
        <DataCard label="Total Sales" value={totalSales} />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
};

OverviewPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

type ServerSideProps = {
  data: any;
  totalRevenue: number;
  totalSales: number;
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const { data, totalRevenue, totalSales } = await getAnalytics(
    session.user.id
  );

  return {
    props: {
      data,
      totalRevenue,
      totalSales,
    },
  };
};

export default OverviewPage;
