import { Footer, Header } from '@/components/shared';
import Toolbar from '@/components/shared/toolbar/toolbar';
import { SmartBar } from '@/components/ui/custom';
import { Raleway } from 'next/font/google';
import { PropsWithChildren } from 'react';

const inter = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

const MarketLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <SmartBar content="New courses being released" /> */}
      <Toolbar className={inter.className} />
      <main className={inter.className}>{children}</main>
      <Footer />
    </>
  );
};

export default MarketLayout;
