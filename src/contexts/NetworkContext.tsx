'use client';

import { createContext, useEffect } from 'react';
import { useAccount, useWalletClient, type WalletClient } from 'wagmi';
import { useWeb3ModalState } from '@web3modal/wagmi/react';
import isEmpty from 'lodash/isEmpty';

import { DEBUG } from '@/constants/index';
import { TARGET_NETWORK } from '@/constants/networks';
import Notifier from '@/utils/Notifier';
import type { Contracts } from '@/types/web3';
import type { Tx } from '@/types/notify';
import useContractLoader from '@/hooks/useContractLoader';
import useEthersProvider, { type Provider } from '@/hooks/useEthersProvider';
import useEthersSigner, { type Signer } from '@/hooks/useEthersSigner';

interface Context {
  address?: `0x${string}`;
  isConnected: boolean;
  publicProvider?: Provider;
  readContracts: Contracts;
  selectedNetworkId?: number;
  signer?: Signer;
  tx: Tx;
  walletClient?: WalletClient;
  writeContracts: Contracts;
}

const CONTEXT_INITIAL_STATE: Context = {
  address: undefined,
  isConnected: false,
  publicProvider: undefined,
  readContracts: {},
  selectedNetworkId: undefined,
  signer: undefined,
  tx: async (_tx, _callback) => new Promise(() => null),
  walletClient: undefined,
  writeContracts: {},
};

const NetworkContext = createContext(CONTEXT_INITIAL_STATE);

export const NetworkProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): JSX.Element => {
  const chainId = TARGET_NETWORK?.chainId || 1;
  const { address, isConnected } = useAccount();
  const { selectedNetworkId } = useWeb3ModalState() as {
    open: boolean;
    selectedNetworkId?: number;
  };

  const { data: walletClient } = useWalletClient({ chainId });
  const publicProvider = useEthersProvider({ chainId });
  const signer = useEthersSigner({ chainId });

  // The Notifier wraps transactions and provides notificiations
  const tx = Notifier(signer, true);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(publicProvider);

  // If you want to make 🔐 write transactions to your contracts, use the signer:
  const writeContracts = useContractLoader(signer);

  useEffect(() => {
    if (
      DEBUG &&
      isConnected &&
      address &&
      publicProvider &&
      selectedNetworkId &&
      signer &&
      walletClient &&
      !isEmpty(readContracts) &&
      !isEmpty(writeContracts)
    ) {
      console.group('_________________ ✅ Nifty League _________________');
      console.log('🌐 publicProvider', publicProvider);
      console.log('📡 walletClient', walletClient);
      console.log('📝 signer', signer);
      console.log('👤 address:', address);
      console.log('⛓️ selectedNetworkId:', selectedNetworkId);
      console.log('📍 targetNetwork:', TARGET_NETWORK);
      console.log('🔓 readContracts', readContracts);
      console.log('🔏 writeContracts', writeContracts);
      console.groupEnd();
    } else if (DEBUG && publicProvider && !isEmpty(readContracts)) {
      console.group('_________________ 🚫 Offline User _________________');
      console.log('🌐 publicProvider', publicProvider);
      console.log('⛓️ selectedNetworkId:', selectedNetworkId);
      console.log('📍 targetNetwork:', TARGET_NETWORK);
      console.log('🔓 readContracts', readContracts);
      console.groupEnd();
    }
  }, [
    address,
    isConnected,
    publicProvider,
    readContracts,
    selectedNetworkId,
    signer,
    walletClient,
    writeContracts,
  ]);

  const context = {
    address,
    isConnected,
    publicProvider,
    readContracts,
    selectedNetworkId,
    signer,
    tx,
    writeContracts,
  };

  return (
    <NetworkContext.Provider value={context}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkContext;
