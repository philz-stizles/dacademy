import useSWR from 'swr';
import { useWeb3Context } from '@/context/web3-context';

export const useAccount = () => {
  const { web3 } = useWeb3Context();
  const { data, error, mutate } = useSWR(
    () => (web3 ? 'web3/accounts' : null),
    async () => {
      const accounts = await web3!.eth.getAccounts();
      const account = accounts[0];

      // Make sure that valid data is returned from this callback.
      // If data is undefined, throw error with explanation.
      if (!account) {
        throw new Error(
          'Cannot retrieve an account. Please refresh the browser.'
        );
      }

      return account;
    }
  );

  return {
    data,
    hasInitialResponse: !!(data || error),
  };
};
