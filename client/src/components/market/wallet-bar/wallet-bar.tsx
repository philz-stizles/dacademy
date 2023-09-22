import { Container } from '@/components/shared';
import { Button } from '@/components/ui/custom';
import { useWeb3Context } from '@/context/web3-context';
import { useAccount } from '@/hooks/use-account';
import { useNetwork } from '@/hooks/use-network';
import { EthRates } from '..';

const WalletBar = () => {
  const { requiresInstall } = useWeb3Context();
  const account = useAccount();
  const { hasInitialResponse, network, targetNetwork, isSupported } =
    useNetwork();

  return (
    // bg-gradient
    <section className="text-white bg-indigo-600  py-8">
      <Container className="flex justify-between">
        <div className="flex flex-col justify-between items-start">
          <div>
            <h1 className="text-base xs:text-xl break-words">
              Hello, {account.data}
            </h1>
            <h2 className="subtitle mb-5 text-sm xs:text-base">
              I hope you are having a great day!
            </h2>
          </div>
          <Button className="mr-2 text-sm xs:text-lg p-2">
            Learn how to purchase
          </Button>
        </div>

        <div>
          <EthRates />
          {hasInitialResponse && !isSupported && (
            <div className="bg-red-400 px-3 py-2 rounded-lg">
              <div>Connected to wrong network</div>
              <div>
                Connect to: {` `}
                <strong className="text-2xl">{targetNetwork}</strong>
              </div>
            </div>
          )}
          {requiresInstall && (
            <div className="bg-yellow-500 px-3 py-1 rounded-lg text-sm">
              Cannot connect to network. Please install Metamask.
            </div>
          )}
          {network && (
            <div>
              <span>Currently on </span>
              <strong className="text-2xl">{network}</strong>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default WalletBar;
