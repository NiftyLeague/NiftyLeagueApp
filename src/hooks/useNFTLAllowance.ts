'use client';

import { useCallback, useState, useEffect } from 'react';
import { formatEther } from 'ethers6';
import { useContractRead } from 'wagmi';
import { TARGET_NETWORK } from '@/constants/networks';
import CONTRACTS from '@/constants/contracts/deployments';
import type { Abi } from 'viem';

const NFTL_CONTRACT = CONTRACTS[TARGET_NETWORK.chainId].NFTLToken;

interface NFTLAllowanceState {
  allowance: number;
  loading: boolean;
  refetch: () => void;
}

export default function useNFTLAllowance(
  contractAddress: `0x${string}`,
): NFTLAllowanceState {
  const [allowance, setAllowance] = useState(0);
  const {
    data,
    isLoading: loading,
    refetch: refetchBal,
  } = useContractRead({
    address: NFTL_CONTRACT.address,
    abi: NFTL_CONTRACT.abi as Abi,
    functionName: 'allowance',
    args: [contractAddress],
    cacheTime: 10_000,
    enabled: contractAddress.length > 26,
    select: (data) => parseFloat(formatEther(data as bigint)),
  });

  const updateBal = useCallback(
    (data?: number) => {
      if (data && data !== allowance) setAllowance(data);
    },
    [allowance],
  );

  useEffect(() => {
    updateBal(data);
  }, [data, updateBal]);

  const refetch = useCallback(async () => {
    const { data } = await refetchBal();
    updateBal(data);
  }, [updateBal, refetchBal]);

  return { allowance, loading, refetch };
}
