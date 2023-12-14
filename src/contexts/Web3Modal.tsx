'use client';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { mainnet, goerli, hardhat } from 'viem/chains';

import { NFTL_TOKEN_ADDRESS } from '@/constants/contracts';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

const metadata = {
  name: 'Nifty League App',
  description: 'Nifty League Web3 Player Dashboards',
  url: 'https://app.niftyleague.com',
  icons: ['https://app.niftyleague.com/images/logo.png'],
};

const chains = [mainnet, goerli, hardhat];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  chains,
  defaultChain: mainnet,
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
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
