import { useAccount } from './use-account';
import { useNetwork } from './use-network';

export const useWalletInfo = () => {
  const network = useNetwork();
  const account = useAccount();

  const isConnecting =
    !account.hasInitialResponse && !network.hasInitialResponse;
  const hasConnectedWallet = account.data && network.isSupported; // !!(account.data && network.isSupported);

  return {
    account: account.data,
    isConnecting,
    hasConnectedWallet,
  };
};
