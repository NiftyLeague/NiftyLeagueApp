import { useContext, useMemo } from 'react';
import type { Contract, InterfaceAbi } from 'ethers6';
import NetworkContext from '@/contexts/NetworkContext';
import { getContract } from '@/utils/ethers';
import { COMICS_MERKLE_DISTRIBUTOR_ADDRESS } from '@/constants/contracts';
import COMICS_MERKLE_DISTRIBUTOR_ABI from '@/constants/contracts/abis/comics-merkle-distributor.json';

function useContract(contractAddress: string, ABI: InterfaceAbi) {
  const { signer } = useContext(NetworkContext);

  return useMemo(() => {
    if (!contractAddress || !ABI || !signer) return null;
    try {
      return getContract(contractAddress, ABI, signer);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [contractAddress, ABI, signer]);
}

export default function useMerkleDistributorContract(): Contract | null {
  const { selectedNetworkId } = useContext(NetworkContext);
  return useContract(
    selectedNetworkId
      ? COMICS_MERKLE_DISTRIBUTOR_ADDRESS[selectedNetworkId]
      : undefined,
    COMICS_MERKLE_DISTRIBUTOR_ABI,
  );
}
