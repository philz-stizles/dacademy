import { DashboardLayout } from '@/components/layouts';
import { Chart } from '@/components/ui/custom';
import { DataCard } from '@/components/ui/custom/cards';
import { NextPageWithLayout } from '@/pages/_app';

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

export const getServerSideProps = () => {
  return {
    props: {
      data: {},
      totalRevenue: 34,
      totalSales: 23,
    },
  };
};

export default OverviewPage;
