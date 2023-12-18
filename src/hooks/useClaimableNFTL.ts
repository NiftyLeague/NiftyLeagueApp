'use client';

import { useCallback, useState, useEffect } from 'react';
import { formatEther } from 'ethers6';
import { useContractRead } from 'wagmi';
import { TARGET_NETWORK } from '@/constants/networks';
import CONTRACTS from '@/contracts/deployments';
import type { Abi } from 'viem';

const NFTL_CONTRACT = CONTRACTS[TARGET_NETWORK.chainId].NFTLToken;

interface NFTLClaimableState {
  totalAccrued: number;
  loading: boolean;
  refetch: () => void;
}

export default function useClaimableNFTL(
  tokenIndices: number[],
): NFTLClaimableState {
  const [totalAccrued, setTotalAccrued] = useState(0);
  const {
    data,
    isLoading: loading,
    refetch: refetchBal,
  } = useContractRead({
    address: NFTL_CONTRACT.address,
    abi: NFTL_CONTRACT.abi as Abi,
    functionName: 'accumulatedMultiCheck',
    args: [tokenIndices],
    watch: true,
    cacheTime: 300_000,
    enabled: tokenIndices.length > 0,
    select: (data) => parseFloat(formatEther(data as bigint)),
  });

  const updateBal = useCallback(
    (data?: number) => {
      if (data && data !== totalAccrued) setTotalAccrued(data);
    },
    [totalAccrued],
  );

  useEffect(() => {
    updateBal(data);
  }, [data, updateBal]);

  const refetch = useCallback(async () => {
    const { data } = await refetchBal();
    updateBal(data);
  }, [updateBal, refetchBal]);

  return { totalAccrued, loading, refetch };
}
