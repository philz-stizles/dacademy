import { Aside, Container, Navbar } from '@/components/shared';
import Head from 'next/head';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Dacademy - Instructor Mode</title>
      </Head>
      <Navbar />

      {/* <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Aside />
      </div> */}
      <main className="pt-[60px]">
        <Container>{children}</Container>
      </main>
      {/* <main className="md:pl-56 pt-[80px] h-full">{children}</main> */}
    </>
  );
};

export default DashboardLayout;
