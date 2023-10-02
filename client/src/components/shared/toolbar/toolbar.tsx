import clx from 'classnames';
import { IconButton, Search, SearchInput } from '@/components/ui/custom';
import Container from '../container/container';
import { useWeb3Context } from '@/context/web3-context';
import { useAccount } from '@/hooks/use-account';
import Logo from '@/components/ui/custom/logo/logo';
import { UserNav } from '@/components/ui/custom';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Heart,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
} from 'lucide-react';
import { useSession } from 'next-auth/react';

type Props = {
  className?: string;
};

const Toolbar = ({ className }: Props) => {
  const { data: session } = useSession();
  const { isLoading, requiresInstall, connect } = useWeb3Context();
  const account = useAccount();

  return (
    <header className={clx('py-3', className)}>
      <Container className="flex items-center gap-12" fluid>
        <Logo />
        <div className="flex-1 hidden md:block">
          <SearchInput />
        </div>
        {isLoading ? (
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
        )}
        <div className="flex items-center gap-6">
          <Heart size={20} />
          <ShoppingCart size={20} />
          <Bell size={20} />
          {session && session.user && <UserNav />}
        </div>
      </Container>
    </header>
  );
};

export default Toolbar;
