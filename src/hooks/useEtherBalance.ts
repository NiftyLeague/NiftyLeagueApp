import { useCallback, useContext, useEffect, useState } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { ethers } from 'ethers';

/*
  ~ What it does? ~

  Gets your ETH balance

  ~ How can I use? ~

  const {balance, refetch, loading} = useEtherBalance();
*/

interface EtherBalanceState {
  balance: number;
  loading: boolean;
  refetch: () => void;
}

export default function useEtherBalance(): EtherBalanceState {
  const { address, userProvider } = useContext(NetworkContext);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEtherBalance = useCallback(async () => {
    if (!address || !userProvider) return;
    try {
      setLoading(true);
      const rawBalance = await userProvider.getBalance(address);
      setBalance(Number(ethers.utils.formatEther(rawBalance)));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [address, userProvider]);

  useEffect(() => {
    fetchEtherBalance();
  }, [fetchEtherBalance]);

  return {
    balance,
    refetch: fetchEtherBalance,
    loading,
  };
}
