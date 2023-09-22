import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { Web3, Web3BaseProvider } from 'web3';
import { connectToMetaMask, loadContract } from '@/lib/web3';

type Web3ContextType = StateType & {
  requiresInstall: boolean;
  connect: () => void;
};

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  web3: null,
  contract: null,
  isLoading: true,
  requiresInstall: true,
  connect: () => {},
});

type StateType = {
  provider: Web3BaseProvider | null;
  web3: Web3 | null;
  contract: any;
  isLoading: boolean;
};

const initState = {
  provider: null,
  web3: null,
  contract: null,
  isLoading: true,
};

export const Web3Provider = ({ children }: PropsWithChildren) => {
  const [web3Api, setWeb3Api] = useState<StateType>(initState);

  const setListeners = useCallback((provider: Web3BaseProvider) => {
    provider.on('chainChanged', (_: any) => window.location.reload());
  }, []);

  useEffect(() => {
    const loadWeb3 = async () => {
      const provider = (await detectEthereumProvider()) as Web3BaseProvider;
      if (provider) {
        console.log('Ethereum successfully detected!');
        const web3 = new Web3(provider);
        const contract = await loadContract('Dacademy', web3);
        setListeners(provider);
        setWeb3Api({ provider, web3, contract, isLoading: false });
      } else {
        setWeb3Api((prevState) => ({ ...prevState, isLoading: false }));
        console.error('Please install MetaMask!');
      }
    };

    loadWeb3();
  }, [setListeners]);

  const value = useMemo(() => {
    const { provider, web3, isLoading } = web3Api;

    return {
      ...web3Api,
      requiresInstall: !isLoading && !web3,
      connect: connectToMetaMask(provider),
    };
  }, [web3Api]);

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3Context = () => useContext(Web3Context);
