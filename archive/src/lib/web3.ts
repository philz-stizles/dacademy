import Web3 from 'web3';

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name: string, web3: Web3) => {
  let contract: any = null;

  try {
    const response = await fetch(`/contracts/${name}.json`);
    const Artifact = await response.json();
    contract = new web3.eth.Contract(Artifact.abi, Artifact.networks[NETWORK_ID!].address);
  } catch (error: any) {
    console.log(`Contract ${name} cannot be loaded`, error);
  }

  return contract;
};

export const connectToMetaMask = (provider: any) => {
  return provider
    ? async () => {
        try {
          await provider.request({ method: 'eth_requestAccounts' });
        } catch (error: any) {
          console.log('Cannot retrieve account', error);
          location.reload();
        }
      }
    : () =>
        console.log(
          'Cannot connect to Metamask. Please, try reloading your browser'
        );
};
