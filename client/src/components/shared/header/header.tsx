import clx from 'classnames';
import { Search } from '@/components/ui/custom';
import Container from '../container/container';
import Navbar from '../nav/nav';
import { useWeb3Context } from '@/context/web3-context';
import { useAccount } from '@/hooks/use-account';
import Logo from '@/components/ui/custom/logo/logo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const { isLoading, requiresInstall, connect } = useWeb3Context();
  const account = useAccount();
  const router = useRouter();

  return (
    <header className={clx('py-3 bg-indigo-50', className)}>
      <Container fluid className="flex items-center gap-8">
        <Logo />
        <Navbar />
        <div className="flex items-center gap-3">
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

          <Button variant="link" onClick={() => router.push('/auth')}>
            Sign up
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
