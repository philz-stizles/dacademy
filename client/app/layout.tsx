import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { BannerProvider } from '@/context/banner-context';
import { ModalProvider } from '@/components/providers/modal-provider';
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
// import client from '@/graphql/client';
// import { ApolloProvider } from '@apollo/client';

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '900', '700'],
});

export const metadata: Metadata = {
  title: 'Dacademy',
  description:
    'Explore a decentralized academy platform revolutionizing education. Access a diverse range of courses, taught by experts worldwide. Empowering learners with blockchain technology for secure, transparent, and verifiable credentials. Join a global community committed to decentralized, peer-to-peer learning.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={nunito.className}>
          {/* <ApolloProvider client={client}> */}
          <BannerProvider>
            <ModalProvider />
            <ConfettiProvider />
            <ToasterProvider />
            {children}
          </BannerProvider>
          {/* </ApolloProvider> */}
        </body>
      </html>
    </SessionProvider>
  );
}
