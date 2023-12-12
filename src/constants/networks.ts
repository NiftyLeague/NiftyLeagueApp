import { mainnet, goerli } from 'viem/chains';
import { Network, NetworkName } from '@/types/web3';

export const NetworkContextName = 'NETWORK';

export const LOCAL_CHAIN_ID = 31337;

export const NETWORK_ICON = {
  [mainnet.id]: '/images/networks/mainnet-network.jpg',
  [goerli.id]: '/images/networks/goerli-network.jpg',
};

export const NETWORK_LABEL = {
  [LOCAL_CHAIN_ID]: 'localhost',
  [mainnet.id]: 'Ethereum',
  [goerli.id]: 'Görli',
};

// needs to match hardhat settings otherwise use rpcUrl for our localProvider initialization
export const NETWORK_NAME: { [chainId: number]: NetworkName } = {
  [LOCAL_CHAIN_ID]: 'localhost',
  [mainnet.id]: 'mainnet',
  [goerli.id]: 'goerli',
};

export const RPC = {
  [mainnet.id]: `https://mainnet.infura.io/v3/${
    process.env.NEXT_PUBLIC_INFURA_PROJECT_ID as string
  }`,
  [goerli.id]: `https://goerli.infura.io/v3/${
    process.env.NEXT_PUBLIC_INFURA_PROJECT_ID as string
  }`,
};

export const NETWORKS: { [network: string]: Network } = {
  localhost: {
    blockExplorer: '',
    chainId: LOCAL_CHAIN_ID,
    label: NETWORK_LABEL[LOCAL_CHAIN_ID],
    rpcUrl: `http://localhost:8545`,
  },
  mainnet: {
    blockExplorer: 'https://etherscan.io/',
    chainId: mainnet.id,
    label: NETWORK_LABEL[mainnet.id],
    name: NETWORK_NAME[mainnet.id],
    rpcUrl: RPC[mainnet.id],
  },
  goerli: {
    blockExplorer: 'https://goerli.etherscan.io/',
    chainId: goerli.id,
    faucet: 'https://goerlifaucet.com/',
    label: NETWORK_LABEL[goerli.id],
    name: NETWORK_NAME[goerli.id],
    rpcUrl: RPC[goerli.id],
  },
};

export const NETWORK = (chainId: number): Network =>
  Object.values(NETWORKS).find((n) => n.chainId === chainId) || {
    blockExplorer: '',
    chainId: 1,
    label: '',
    rpcUrl: '',
  };

export const SUPPORTED_CHAIN_IDS: number[] = [
  LOCAL_CHAIN_ID,
  mainnet.id,
  goerli.id,
];

export const VALID_ETHERS_NETWORKS: number[] = [mainnet.id, goerli.id];

export const VALID_NOTIFY_NETWORKS: number[] = [mainnet.id, goerli.id];
