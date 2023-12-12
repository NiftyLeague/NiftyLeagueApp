'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { ethers, Signer, providers } from 'ethers';
import { mainnet } from 'viem/chains';
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers5/react';
import isEmpty from 'lodash/isEmpty';

import {
  Contracts,
  Ethereumish,
  LocalProvider,
  Network,
  UserProvider,
} from '@/types/web3';
import { Tx } from '@/types/notify';
import useContractLoader from '@/hooks/useContractLoader';
import Notifier from '@/utils/Notifier';
import { NetworkName } from '@/types/web3';
import { NETWORKS, VALID_ETHERS_NETWORKS } from '@/constants/networks';
import { ALCHEMY_ID, DEBUG } from '@/constants/index';

const { getDefaultProvider, Web3Provider } = providers;

// if (typeof window !== 'undefined' && window?.ethereum)
//   (window.ethereum as Ethereumish).autoRefreshOnNetworkChange = false;

// 📡 What chain are your contracts deployed to? (localhost, goerli, mainnet)
const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_NETWORK as NetworkName];

// 🛰 providers
const providerOptions = {
  infura: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
  etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
  alchemy: ALCHEMY_ID[targetNetwork.chainId],
};

// 🏠 Your local provider is usually pointed at your local blockchain
const localProvider = getDefaultProvider(
  VALID_ETHERS_NETWORKS.includes(targetNetwork.chainId)
    ? targetNetwork.chainId
    : targetNetwork.rpcUrl,
  providerOptions,
) as LocalProvider;

interface Context {
  address?: `0x${string}`;
  localProvider: LocalProvider;
  switchToNetwork: (chainId: number) => void;
  readContracts: Contracts;
  selectedChainId?: number;
  signer?: Signer;
  targetNetwork: Network;
  tx: Tx;
  userProvider?: UserProvider;
  writeContracts: Contracts;
}

const CONTEXT_INITIAL_STATE: Context = {
  address: undefined,
  switchToNetwork: (chainId: number) => {},
  localProvider,
  readContracts: {},
  selectedChainId: undefined,
  signer: undefined,
  targetNetwork,
  tx: async (_tx, _callback) => new Promise(() => null),
  userProvider: undefined,
  writeContracts: {},
};

const NetworkContext = createContext(CONTEXT_INITIAL_STATE);

export const NetworkProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): JSX.Element => {
  const { address, chainId: selectedChainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [userProvider, setUserProvider] = useState<UserProvider>();
  const [signer, setSigner] = useState<providers.JsonRpcSigner | undefined>();

  useEffect(() => {
    if (walletProvider) {
      const provider = new Web3Provider(walletProvider);
      setUserProvider(provider);
      setSigner(provider.getSigner());
    }
  }, [walletProvider]);

  // The Notifier wraps transactions and provides notificiations
  const tx = Notifier(userProvider, targetNetwork, true);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider);

  const switchToNetwork = useCallback(
    async (chainId: number) => {
      if (!userProvider) {
        return;
      }
      try {
        const transactionStatus = await userProvider.send(
          'wallet_switchEthereumChain',
          [{ chainId: ethers.utils.hexValue(chainId) }],
        );
        return transactionStatus;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Switching network already pending - ', error);
      }
    },
    [userProvider],
  );

  useEffect(() => {
    if (
      DEBUG &&
      address &&
      localProvider &&
      !isEmpty(readContracts) &&
      selectedChainId &&
      targetNetwork &&
      userProvider &&
      !isEmpty(writeContracts)
    ) {
      console.log('_________________ 🏗 Nifty League _________________');
      console.log('📡 userProvider', userProvider);
      console.log('📡 localProvider', localProvider);
      console.log('🕵🏻‍♂️ selectedChainId:', selectedChainId);
      console.log('🔭 targetNetwork:', targetNetwork);
      console.log('👩‍💼 user address:', address);
      console.log('📝 readContracts', readContracts);
      console.log('🔐 writeContracts', writeContracts);
    }
  }, [address, readContracts, selectedChainId, userProvider, writeContracts]);

  const context = {
    address,
    localProvider,
    readContracts,
    selectedChainId,
    signer,
    targetNetwork,
    switchToNetwork,
    tx,
    userProvider,
    writeContracts,
  };

  return (
    <NetworkContext.Provider value={context}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkContext;
