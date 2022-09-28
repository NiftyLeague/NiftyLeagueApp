import { ChainId } from '@sushiswap/sdk';
import { Network, NetworkName } from 'types/web3';

import Goerli from '../assets/images/networks/goerli-network.jpg';
import Mainnet from '../assets/images/networks/mainnet-network.jpg';

export const NetworkContextName = 'NETWORK';

export const LOCAL_CHAIN_ID = 31337;

export const NETWORK_ICON = {
  [ChainId.MAINNET]: Mainnet,
  [ChainId.GÖRLI]: Goerli,
};

export const NETWORK_LABEL = {
  [LOCAL_CHAIN_ID]: 'localhost',
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.GÖRLI]: 'Görli',
};

// needs to match hardhat settings otherwise use rpcUrl for our localProvider initialization
export const NETWORK_NAME: { [chainId: number]: NetworkName } = {
  [LOCAL_CHAIN_ID]: 'localhost',
  [ChainId.MAINNET]: 'mainnet',
  [ChainId.GÖRLI]: 'goerli',
};

export const RPC = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${
    process.env.REACT_APP_INFURA_PROJECT_ID as string
  }`,
  [ChainId.GÖRLI]: `https://goerli.infura.io/v3/${
    process.env.REACT_APP_INFURA_PROJECT_ID as string
  }`,
};

export const NETWORKS: { [network: string]: Network } = {
  localhost: {
    blockExplorer: '',
    chainId: LOCAL_CHAIN_ID,
    label: NETWORK_LABEL[LOCAL_CHAIN_ID],
    rpcUrl: `http://${window.location.hostname}:8545`,
  },
  mainnet: {
    blockExplorer: 'https://etherscan.io/',
    chainId: ChainId.MAINNET,
    label: NETWORK_LABEL[ChainId.MAINNET],
    name: NETWORK_NAME[ChainId.MAINNET],
    rpcUrl: RPC[ChainId.MAINNET],
  },
  goerli: {
    blockExplorer: 'https://goerli.etherscan.io/',
    chainId: ChainId.GÖRLI,
    faucet: 'https://goerlifaucet.com/',
    label: NETWORK_LABEL[ChainId.GÖRLI],
    name: NETWORK_NAME[ChainId.GÖRLI],
    rpcUrl: RPC[ChainId.GÖRLI],
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
  ChainId.MAINNET,
  ChainId.GÖRLI,
];

export const VALID_ETHERS_NETWORKS: number[] = [
  ChainId.MAINNET,
  ChainId.ROPSTEN,
  ChainId.RINKEBY,
  ChainId.GÖRLI,
  ChainId.KOVAN,
  ChainId.MATIC,
  ChainId.MATIC_TESTNET,
  ChainId.BSC,
  ChainId.BSC_TESTNET,
  ChainId.XDAI,
];

export const VALID_NOTIFY_NETWORKS: number[] = [
  ChainId.MAINNET,
  ChainId.ROPSTEN,
  ChainId.RINKEBY,
  ChainId.GÖRLI,
  ChainId.KOVAN,
  ChainId.BSC,
  ChainId.XDAI,
];
