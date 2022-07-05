/* eslint-disable no-console */
import { useMemo } from 'react';
import { providers } from 'ethers';
import BurnerProvider from 'burner-provider';
import { Network, UserProvider } from 'types/web3';
import { DEBUG } from 'constants/index';
import { LOCAL_CHAIN_ID } from 'constants/networks';

/*
  ~ What it does? ~

  Gets user provider

  ~ How can I use? ~

  const userProvider = useUserProvider(injectedProvider, localProvider);

  ~ Features ~

  - Specify the injected provider from Metamask
  - Specify the local provider
  - Usage examples:
    const address = useUserAddress(userProvider);
    const tx = Notifier(userProvider, targetNetwork)
*/

interface BurnerConfig {
  privateKey?: string;
  rpcUrl?: string;
  provider?: UserProvider;
  namespace?: string;
}

const useUserProvider = (
  injectedProvider: UserProvider | undefined,
  localProvider: providers.JsonRpcProvider,
  targetNetwork: Network,
): providers.Web3Provider | undefined =>
  useMemo(() => {
    if (injectedProvider) {
      if (DEBUG) console.log('🦊 Using injected provider');
      return injectedProvider;
    }
    if (!localProvider || targetNetwork.chainId !== LOCAL_CHAIN_ID)
      return undefined;

    const burnerConfig: BurnerConfig = {};

    if (window.location.pathname?.indexOf('/pk') >= 0) {
      const incomingPK = window.location.hash.replace('#', '');
      let rawPK: string;
      if (incomingPK.length === 64 || incomingPK.length === 66) {
        if (DEBUG) console.log('🔑 Incoming Private Key...');
        rawPK = incomingPK;
        burnerConfig.privateKey = rawPK;
        window.history.pushState({}, '', '/');
        const currentPrivateKey = window.localStorage.getItem('metaPrivateKey');
        if (currentPrivateKey && currentPrivateKey !== rawPK) {
          window.localStorage.setItem(
            `metaPrivateKey_backup${Date.now()}`,
            currentPrivateKey,
          );
        }
        window.localStorage.setItem('metaPrivateKey', rawPK);
      }
    }

    if (localProvider.connection && localProvider.connection.url) {
      burnerConfig.rpcUrl = localProvider.connection.url;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return new providers.Web3Provider(new BurnerProvider(burnerConfig));
    }
    // eslint-disable-next-line no-underscore-dangle
    const networkName = localProvider._network?.name;
    burnerConfig.rpcUrl = `https://${networkName || 'mainnet'}.infura.io/v3/${
      process.env.REACT_APP_INFURA_PROJECT_ID as string
    }`;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return new providers.Web3Provider(new BurnerProvider(burnerConfig));
  }, [injectedProvider, localProvider, targetNetwork.chainId]);

export default useUserProvider;
