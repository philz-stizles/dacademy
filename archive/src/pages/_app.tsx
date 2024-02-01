import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter, Nunito_Sans, Raleway, Roboto } from 'next/font/google';
import { ApolloProvider } from '@apollo/client';
import { Web3Provider } from '@/context/web3-context';
import { BannerProvider } from '@/context/banner-context';
import { ModalProvider } from '@/components/providers/modal-provider';
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import { SessionProvider } from 'next-auth/react';
import client from '@/graphql/client';
import '@/styles/globals.css';
import Head from 'next/head';

// If loading a variable font, you don't need to specify the font weight
const inter = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '900', '700'],
  // weight: ['100', '300', '400', '500', '900', '700'],
  // weight: ['200', '300', '400', '500', '600', '700'],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Web3Provider>
          <BannerProvider>
            <ModalProvider />
            <ConfettiProvider />
            <ToasterProvider />
            {getLayout(
              <>
                <Head>
                  <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <main className={inter.className}>
                  <Component {...pageProps} />
                </main>
              </>
            )}
          </BannerProvider>
        </Web3Provider>
      </ApolloProvider>
    </SessionProvider>
  );
}
