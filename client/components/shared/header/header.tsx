'use client';

import clx from 'classnames';
import Container from '../container/container';
import Navbar from '../nav/nav';
import { useWeb3Context } from '@/context/web3-context';
import { useAccount } from '@/hooks/use-account';
import Logo from '@/components/ui/custom/logo/logo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IconButton, UserNav } from '@/components/ui/custom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Fragment } from 'react';

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const { data: session } = useSession();
  // const { isLoading, requiresInstall, connect } = useWeb3Context();
  // const account = useAccount();
  const router = useRouter();

  return (
    <header className={clx('py-3', className)}>
      <Container fluid className="flex items-center gap-8">
        <Logo />
        <Navbar />
        <div className="flex items-center gap-12">
          {/* {isLoading ? (
            <Button disabled={true} onClick={connect}>
              Loading...
            </Button>
          ) : account.data ? (
            <Button className="cursor-default">Hi there</Button>
          ) : requiresInstall ? (
            <Button
              onClick={() =>
                window.open('https://metamask.io/download.html', '_blank')
              }
            >
              Install Metamask
            </Button>
          ) : (
            <Button onClick={connect}>Connect Wallet</Button>
          )} */}

          {session ? (
            <div className="flex items-center gap-6">
              <UserNav />
            </div>
          ) : (
            <Fragment>
              <Button variant="link" onClick={() => router.push('/auth')}>
                Become an Instructor
              </Button>
              <div className="flex items-center gap-4">
                <IconButton icon={Heart} />
                <IconButton icon={ShoppingCart} badge="2" />
              </div>
            </Fragment>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
