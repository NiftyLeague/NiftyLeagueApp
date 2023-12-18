'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { NFTL_TOKEN_ADDRESS } from '@/constants/contracts';
import { TARGET_NETWORK } from '@/constants/networks';

/*
  ~ What it does? ~

  Gets your balance in NFTL from given address via user provider

  ~ How can I use? ~

  const { balance, loading, refetch } = useNFTLBalance();
*/

interface NFTLBalanceState {
  balance: number;
  loading: boolean;
  refetch: () => void;
}

export default function useNFTLBalance(): NFTLBalanceState {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState(0);
  const {
    data,
    isLoading: loading,
    refetch: refetchBal,
  } = useBalance({
    address,
    token: NFTL_TOKEN_ADDRESS[TARGET_NETWORK.chainId],
    watch: true,
    cacheTime: 300_000,
    formatUnits: 'ether',
    enabled: isConnected,
  });

  const updateBal = useCallback(
    (formatted?: string) => {
      if (formatted && Number(formatted) !== balance)
        setBalance(Number(formatted));
    },
    [balance],
  );

  useEffect(() => {
    updateBal(data?.formatted);
  }, [data?.formatted, updateBal]);

  const refetch = useCallback(async () => {
    const { data } = await refetchBal();
    updateBal(data?.formatted);
  }, [updateBal, refetchBal]);

  return { balance, loading, refetch };
}
