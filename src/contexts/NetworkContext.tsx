/* eslint-disable no-console */
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Signer, providers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ChainId } from '@sushiswap/sdk';
import Web3Modal from 'web3modal';
import isEmpty from 'lodash/isEmpty';

import {
  Contracts,
  Ethereumish,
  LocalProvider,
  MainnetProvider,
  Network,
  UserProvider,
  Web3ModalProvider,
} from 'types/web3';
import { Tx } from 'types/notify';
import useNetworkInfo from 'hooks/useNetworkInfo';
import useContractLoader from 'hooks/useContractLoader';
import useUserProvider from 'hooks/useUserProvider';
import Notifier from 'helpers/Notifier';
import { ALCHEMY_ID, DEBUG } from '../constants';
import { NETWORKS, VALID_ETHERS_NETWORKS } from '../constants/networks';
import { toast } from 'react-toastify';

const { getDefaultProvider, Web3Provider } = providers;

if (window.ethereum)
  (window.ethereum as Ethereumish).autoRefreshOnNetworkChange = false;

// 📡 What chain are your contracts deployed to? (localhost, rinkeby, mainnet)
const targetNetwork =
  NETWORKS[
    process.env.REACT_APP_NETWORK as 'localhost' | 'rinkeby' | 'mainnet'
  ];

// 🛰 providers
if (DEBUG) console.log('📡 Connecting to Mainnet Ethereum');
const providerOptions = {
  infura: process.env.REACT_APP_INFURA_PROJECT_ID,
  etherscan: process.env.REACT_APP_ETHERSCAN_KEY,
  alchemy: ALCHEMY_ID[ChainId.MAINNET],
};
const mainnetProvider = getDefaultProvider(
  NETWORKS.mainnet.chainId,
  providerOptions,
) as MainnetProvider;

// 🏠 Your local provider is usually pointed at your local blockchain
if (DEBUG)
  console.log('🏠 Connecting to local provider:', targetNetwork.rpcUrl);
const localProviderOptions = {
  ...providerOptions,
  alchemy: ALCHEMY_ID[targetNetwork.chainId] as string | undefined,
};
const localProvider = getDefaultProvider(
  VALID_ETHERS_NETWORKS.includes(targetNetwork.chainId)
    ? targetNetwork.chainId
    : targetNetwork.rpcUrl,
  localProviderOptions,
) as LocalProvider;

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  cacheProvider: true,
  theme: 'dark',
  providerOptions: {
    injected: {
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: process.env.REACT_APP_INFURA_PROJECT_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = () => {
  web3Modal.clearCachedProvider();
  window.localStorage.removeItem('authentication-token');
  window.localStorage.removeItem('uuid-token');
  window.localStorage.removeItem('nonce');
  window.localStorage.removeItem('user-id');
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

interface Context {
  address: string;
  loadWeb3Modal: () => Promise<void>;
  localChainId?: number;
  localProvider: LocalProvider;
  logoutOfWeb3Modal: () => void;
  mainnetProvider: MainnetProvider;
  readContracts: Contracts;
  selectedChainId?: number;
  signer?: Signer;
  targetNetwork: Network;
  tx: Tx;
  userProvider?: UserProvider;
  validAccount: boolean;
  web3Modal: Web3Modal;
  writeContracts: Contracts;
}

const CONTEXT_INITIAL_STATE: Context = {
  address: '',
  loadWeb3Modal: async () => new Promise(() => null),
  localChainId: undefined,
  localProvider,
  logoutOfWeb3Modal,
  mainnetProvider,
  readContracts: {},
  selectedChainId: undefined,
  signer: undefined,
  targetNetwork,
  tx: async (_tx, _callback) => new Promise(() => null),
  userProvider: undefined,
  validAccount: false,
  web3Modal,
  writeContracts: {},
};

const NetworkContext = createContext(CONTEXT_INITIAL_STATE);

export const NetworkProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): JSX.Element => {
  const [injectedProvider, setInjectedProvider] = useState<
    UserProvider | undefined
  >(undefined);
  const [address, setAddress] = useState('');

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(
    injectedProvider,
    localProvider as providers.JsonRpcProvider,
    targetNetwork,
  );
  const signer = userProvider?.getSigner();

  // You can warn the user if you would like them to be on a specific network
  const { chainId: localChainId } = useNetworkInfo(localProvider);
  const { chainId: selectedChainId } = useNetworkInfo(userProvider);

  // The Notifier wraps transactions and provides notificiations
  const tx = Notifier(userProvider, targetNetwork, true);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider);

  const updateWeb3ModalTheme = useCallback(async () => {
    const web3Theme = 'dark';
    await web3Modal.updateTheme(web3Theme);
  }, []);

  const loadWeb3Modal = useCallback(async () => {
    try {
      const provider: Web3ModalProvider =
        (await web3Modal.connect()) as Web3ModalProvider;
      await updateWeb3ModalTheme();
      setInjectedProvider(new Web3Provider(provider));
      provider.on('accountsChanged', (accounts) => {
        if (DEBUG) console.log('web3 accountsChanged:', accounts);
        setInjectedProvider(new Web3Provider(provider));
      });
      provider.on('chainChanged', (chainId) => {
        if (DEBUG) console.log('web3 chainChanged:', chainId);
        setInjectedProvider(new Web3Provider(provider));
      });
      provider.on('connect', (info) => {
        if (DEBUG) console.log('web3 info:', info);
      });
      provider.on('disconnect', (error) => {
        if (DEBUG) console.log('web3 error:', error);
      });
    } catch (err) {
      console.error(err);
      if (err.message === 'User Rejected') {
        toast.error(
          "User Rejected! Please unlock your wallet if you haven't yet!",
          {
            theme: 'dark',
          },
        );
      } else {
        toast.error(err.message, { theme: 'dark' });
      }
    }
  }, [setInjectedProvider, updateWeb3ModalTheme]);

  useEffect(() => {
    // eslint-disable-next-line no-void
    if (web3Modal.cachedProvider) void loadWeb3Modal();
  }, [loadWeb3Modal]);

  useEffect(() => {
    // eslint-disable-next-line no-void
    void updateWeb3ModalTheme();
  }, [updateWeb3ModalTheme]);

  useEffect(() => {
    if (
      DEBUG &&
      address &&
      localChainId &&
      localProvider &&
      mainnetProvider &&
      !isEmpty(readContracts) &&
      selectedChainId &&
      targetNetwork &&
      userProvider &&
      !isEmpty(writeContracts)
    ) {
      console.log('_________________ 🏗 Nifty League _________________');
      console.log('🌎 mainnetProvider', mainnetProvider);
      console.log('📡 userProvider', userProvider);
      console.log('📡 localProvider', localProvider);
      console.log('🏠 localChainId', localChainId);
      console.log('🕵🏻‍♂️ selectedChainId:', selectedChainId);
      console.log('🔭 targetNetwork:', targetNetwork);
      console.log('👩‍💼 user address:', address);
      console.log('📝 readContracts', readContracts);
      console.log('🔐 writeContracts', writeContracts);
    }
  }, [
    address,
    localChainId,
    readContracts,
    selectedChainId,
    userProvider,
    writeContracts,
  ]);

  useEffect(() => {
    (async () => {
      if (!signer) {
        return;
      }

      try {
        const addr = await signer.getAddress();
        setAddress(addr);
      } catch (err) {
        setAddress('');
      }
    })();
  }, [signer]);

  const context = {
    address,
    loadWeb3Modal,
    localChainId,
    localProvider,
    logoutOfWeb3Modal,
    mainnetProvider,
    readContracts,
    selectedChainId,
    signer,
    targetNetwork,
    tx,
    userProvider,
    validAccount: Boolean(web3Modal.cachedProvider),
    web3Modal,
    writeContracts,
  };

  return (
    <NetworkContext.Provider value={context}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkContext;
