import { Footer, Header } from '@/components/shared';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
