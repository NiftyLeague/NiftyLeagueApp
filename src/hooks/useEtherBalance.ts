'use client';

import { useAccount, useBalance } from 'wagmi';

/*
  ~ What it does? ~

  Gets your ETH balance formatted in ether units

  ~ How can I use? ~

  const {balance, refetch, loading} = useEtherBalance();
*/

type RefetchEthBalance = (options: {
  throwOnError: boolean;
  cancelRefetch: boolean;
}) => Promise<{
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
}>;

interface EtherBalanceState {
  balance: number;
  loading: boolean;
  refetch: RefetchEthBalance;
}

export default function useEtherBalance(): EtherBalanceState {
  const { address, isConnected } = useAccount();
  const { data, isLoading, isFetched, refetch } = useBalance({
    address,
    watch: true,
    cacheTime: 10_000,
    formatUnits: 'ether',
    enabled: isConnected,
  });

  return {
    balance: isFetched ? Number(data?.formatted) : 0,
    loading: isLoading,
    refetch: refetch as unknown as RefetchEthBalance,
  };
}
