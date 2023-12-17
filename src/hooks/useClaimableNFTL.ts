'use client';

import { useCallback } from 'react';
import { formatEther } from 'ethers';
import { Contracts } from '@/types/web3';
import useContractReader from './useContractReader';
import { NFTL_CONTRACT } from '@/constants/contracts';

export default function useClaimableNFTL(
  contracts: Contracts,
  tokenIndices: number[],
  refreshKey?: string | number,
): number {
  const formatter = useCallback((value: bigint) => {
    const totalAccumulatedStr = value && value.toString();
    return totalAccumulatedStr && formatEther(totalAccumulatedStr);
  }, []);
  const totalAccumulated = useContractReader(
    contracts,
    NFTL_CONTRACT,
    'accumulatedMultiCheck',
    [tokenIndices],
    undefined,
    formatter,
    refreshKey,
    !tokenIndices.length,
  ) as string;
  return parseFloat(totalAccumulated);
}
