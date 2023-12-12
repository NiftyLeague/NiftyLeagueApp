import { useContext, useMemo } from 'react';
import { Contract } from 'ethers';
import NetworkContext from '@/contexts/NetworkContext';
import { getContract } from '@/utils/ethers';
import { COMICS_MERKLE_DISTRIBUTOR_ADDRESS } from '@/constants/contracts';
import COMICS_MERKLE_DISTRIBUTOR_ABI from '@/contracts/abis/comics-merkle-distributor.json';

function useContract(address: string, ABI, withSignerIfPossible = true) {
  const { userProvider, address: account } = useContext(NetworkContext);

  return useMemo(() => {
    if (!address?.length || !ABI || !userProvider) return null;
    try {
      return getContract(
        address,
        ABI,
        userProvider,
        withSignerIfPossible && account ? account : undefined,
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, userProvider, withSignerIfPossible, account]);
}

export default function useMerkleDistributorContract(): Contract | null {
  const { selectedChainId } = useContext(NetworkContext);
  return useContract(
    selectedChainId
      ? COMICS_MERKLE_DISTRIBUTOR_ADDRESS[selectedChainId]
      : undefined,
    COMICS_MERKLE_DISTRIBUTOR_ABI,
    true,
  );
}
