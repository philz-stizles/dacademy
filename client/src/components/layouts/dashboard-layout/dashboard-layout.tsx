import { Aside, Container, Navbar } from '@/components/shared';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />

      {/* <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Aside />
      </div> */}
      <main className="pt-[60px] h-full">
        <Container>{children}</Container>
      </main>
      {/* <main className="md:pl-56 pt-[80px] h-full">{children}</main> */}
    </div>
  );
};

export default DashboardLayout;
