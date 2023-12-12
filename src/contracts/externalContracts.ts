import { mainnet, goerli } from 'viem/chains';
import DAI_ABI from './abis/dai.json';
import COMICS_MERKLE_ABI from './abis/comics-merkle-distributor.json';
import MERKLE_ABI from './abis/merkle-distributor.json';
import {
  COMICS_MERKLE_DISTRIBUTOR_ADDRESS,
  MERKLE_DISTRIBUTOR_ADDRESS,
} from '@/constants/contracts';
import { LOCAL_CHAIN_ID } from '@/constants/networks';

const EXTERNAL_CONTRACTS: {
  [chainId: number]: {
    [contractName: string]: { address: string; abi: any[] };
  };
} = {
  [LOCAL_CHAIN_ID]: {
    MerkleDistributor: {
      address: MERKLE_DISTRIBUTOR_ADDRESS[LOCAL_CHAIN_ID],
      abi: MERKLE_ABI,
    },
    ComicsMerkleDistributor: {
      address: COMICS_MERKLE_DISTRIBUTOR_ADDRESS[LOCAL_CHAIN_ID],
      abi: COMICS_MERKLE_ABI,
    },
  },
  [mainnet.id]: {
    DAI: {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      abi: DAI_ABI,
    },
    MerkleDistributor: {
      address: MERKLE_DISTRIBUTOR_ADDRESS[mainnet.id],
      abi: MERKLE_ABI,
    },
    ComicsMerkleDistributor: {
      address: COMICS_MERKLE_DISTRIBUTOR_ADDRESS[mainnet.id],
      abi: COMICS_MERKLE_ABI,
    },
  },
  [goerli.id]: {
    MerkleDistributor: {
      address: MERKLE_DISTRIBUTOR_ADDRESS[goerli.id],
      abi: MERKLE_ABI,
    },
    ComicsMerkleDistributor: {
      address: COMICS_MERKLE_DISTRIBUTOR_ADDRESS[goerli.id],
      abi: COMICS_MERKLE_ABI,
    },
  },
};

export default EXTERNAL_CONTRACTS;
