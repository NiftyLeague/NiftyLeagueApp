'use client';

// import { useEffect } from 'react';
import { mainnet, goerli } from 'viem/chains';
import {
  createWeb3Modal,
  defaultConfig,
  //   useWeb3Modal,
  //   useWeb3ModalAccount,
  //   useWeb3ModalState,
  //   useWeb3ModalProvider,
  //   useWeb3ModalTheme,
} from '@web3modal/ethers5/react';
import { NFTL_TOKEN_ADDRESS } from '@/constants/contracts';
import { LOCAL_CHAIN_ID } from '@/constants/networks';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

const eth_mainnet = {
  chainId: mainnet.id,
  name: mainnet.name,
  currency: mainnet.nativeCurrency.symbol,
  explorerUrl: mainnet.blockExplorers.default.url,
  rpcUrl: mainnet.rpcUrls.default.http[0],
};

const eth_testnet = {
  chainId: goerli.id,
  name: goerli.name,
  currency: goerli.nativeCurrency.symbol,
  explorerUrl: goerli.blockExplorers.default.url,
  rpcUrl: goerli.rpcUrls.default.http[0],
};

const eth_local = {
  chainId: LOCAL_CHAIN_ID,
  name: 'localhost',
  currency: 'ETH',
  explorerUrl: '',
  rpcUrl: 'http://localhost:8545',
};

const metadata = {
  name: 'Nifty League App',
  description: 'Nifty League Web3 Player Dashboards',
  url: 'https://app.niftyleague.com',
  icons: ['https://app.niftyleague.com/images/logo.png'],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [eth_mainnet, eth_testnet, eth_local],
  defaultChain: eth_mainnet,
  projectId,
  tokens: {
    [mainnet.id]: {
      address: NFTL_TOKEN_ADDRESS[mainnet.id],
      image: 'https://app.niftyleague.com/images/NFTL.png',
    },
    [goerli.id]: {
      address: NFTL_TOKEN_ADDRESS[goerli.id],
      image: 'https://app.niftyleague.com/images/NFTL.png',
    },
  },
  termsConditionsUrl: 'https://niftyleague.com/terms-of-service',
  privacyPolicyUrl: 'https://niftyleague.com/privacy-policy',
  themeMode: 'dark',
});

export function Web3ModalProvider({ children }) {
  //   const { open: onOpen, close: onClose } = useWeb3Modal();
  //   const { open, selectedNetworkId } = useWeb3ModalState();
  //   const { address, chainId, isConnected } = useWeb3ModalAccount();
  //   const { setThemeMode } = useWeb3ModalTheme();

  //   onOpen();
  //   onClose();

  //   useEffect(() => {
  //     setThemeMode('dark');
  //   }, [setThemeMode]);

  return children;
}
