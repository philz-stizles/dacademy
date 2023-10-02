import { Footer, Header } from '@/components/shared';
import { SmartBar } from '@/components/ui/custom';
import { useBannerContext } from '@/context/banner-context';
import { Raleway } from 'next/font/google';
import Head from 'next/head';
import { PropsWithChildren } from 'react';

const inter = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

const HomeLayout = ({ children }: PropsWithChildren) => {
  const { close, isOpen } = useBannerContext();

  return (
    <>
      <Head>
        <title>Dacademy - Finance your learning with Crypto</title>
      </Head>
      {/* <SmartBar content="New courses being released" /> */}
      <Header className={inter.className} />
      <main className={inter.className}>{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
