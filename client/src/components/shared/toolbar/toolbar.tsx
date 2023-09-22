import clx from 'classnames';
import { IconButton, Search } from '@/components/ui/custom';
import Container from '../container/container';
import { useWeb3Context } from '@/context/web3-context';
import { useAccount } from '@/hooks/use-account';
import Logo from '@/components/ui/custom/logo/logo';
import { UserNav } from '@/components/ui/custom';
import { Button } from '@/components/ui/button';
import { Bell, ShoppingBag, ShoppingBasket } from 'lucide-react';

type Props = {
  className?: string;
};

const Toolbar = ({ className }: Props) => {
  const { isLoading, requiresInstall, connect } = useWeb3Context();
  const account = useAccount();

  return (
    <header className={clx('py-3', className)}>
      <Container className="flex items-center gap-8">
        <Logo />
        <Search />
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
        <div className="flex items-center gap-3">
          <IconButton icon={<Bell />} />
          <ShoppingBag />
          <UserNav />
        </div>
      </Container>
    </header>
  );
};

export default Toolbar;
