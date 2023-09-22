import { BreadCrumbs } from '@/components/ui/custom';
import EthRates from '../eth-rates/eth-rates';
import WalletBar from '../wallet-bar/wallet-bar';
import { useAccount } from '@/hooks/use-account';
import { Container } from '@/components/shared';

const LINKS = [
  {
    href: '/market-place',
    value: 'Buy',
  },
  {
    href: '/market-place/courses/owned',
    value: 'My Courses',
  },
  {
    href: '/market-place/courses/managed',
    value: 'Manage Courses',
    requireAdmin: true,
  },
];

const MarkerHeader = () => {
  const {} = useAccount();
  return (
    <>
      <WalletBar />
      <Container></Container>
      {/* <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <BreadCrumbs isAdmin={false} items={LINKS} />
      </div> */}
    </>
  );
};

export default MarkerHeader;
