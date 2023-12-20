import {
  type AlchemyProvider,
  type BrowserProvider,
  type Contract,
  type EtherscanProvider,
  type FallbackProvider,
  type InfuraProvider,
  type JsonRpcApiProvider,
  type JsonRpcProvider,
} from 'ethers6';

export type MainnetProvider =
  | InfuraProvider
  | EtherscanProvider
  | AlchemyProvider;

export type PublicProvider =
  | FallbackProvider
  | JsonRpcProvider
  | JsonRpcApiProvider;

export type UserProvider = BrowserProvider;

export type Provider = PublicProvider | UserProvider | MainnetProvider;

export interface Ethereumish {
  autoRefreshOnNetworkChange?: boolean;
  chainId?: string;
  enable?: () => Promise<any>;
  isMetaMask?: boolean;
  isStatus?: boolean;
  networkVersion?: string;
  on?: (...args: any[]) => void;
  removeListener?: (...args: any[]) => void;
  request?: (request: { method: string; params?: Array<any> }) => Promise<any>;
  selectedAddress?: string;
  send?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void,
  ) => void;
  sendAsync?: (
    request: { method: string; params?: Array<any> },
    callback: (error: any, response: any) => void,
  ) => void;
}

export interface Contracts {
  [contractName: string]: Contract;
}

export type NetworkName = 'mainnet' | 'goerli' | 'hardhat';

export interface Network {
  blockExplorer: string;
  chainId: number;
  gasPrice?: bigint;
  label: string;
  name?: NetworkName;
  rpcUrl: string;
}

export interface GasStationResponse {
  fast: number;
  fastest: number;
  safeLow: number;
  average: number;
  block_time: number;
  blockNum: number;
  speed: number;
  safeLowWait: number;
  avgWait: number;
  fastWait: number;
  fastestWait: number;
  gasPriceRange: { [range: string]: number };
}
