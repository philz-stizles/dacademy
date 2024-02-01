import useSWR from 'swr';
import { useWeb3Context } from '@/context/web3-context';

const NETWORKS: { [key: string]: string } = {
  1: 'Ethereum Main Network',
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network',
  5: 'Goerli Test Network',
  42: 'Kovan Test Network',
  56: 'Binance Smart Chain',
  1337: 'Ganache',
  '11155111': 'Sepolia Test Network',
};

const targetChainId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID;
const targetNetwork =
  typeof targetChainId === 'string' ? NETWORKS[targetChainId] : '';

export const useNetwork = () => {
  const { web3 } = useWeb3Context();
  const { data, error, ...rest } = useSWR(
    () => (web3 ? 'web3/network' : null),
    async () => {
      const chainId = await web3!.eth.getChainId();

      if (!chainId) {
        throw new Error(
          'Cannot retrieve an account. Please refresh the browser.'
        );
      }

      console.log(chainId, typeof chainId, NETWORKS[chainId.toString()]);

      return NETWORKS[chainId.toString()];
    }
  );

  return {
    network: data,
    hasInitialResponse: !!(data || error),
    isSupported: data === targetNetwork,
    targetNetwork,
    ...rest,
  };
};
