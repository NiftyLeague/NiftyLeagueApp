import { useEffect, useState } from 'react';
import { GET_ARCADE_TOKEN_BALANCE_API } from 'constants/url';

/*
  ~ What it does? ~

  Gets your arcade balance

  ~ How can I use? ~

  const {arcadeBalance, refetch, loading} = useArcadeBalance();
*/

interface ArcadeBalanceInfo {
  updated_at: number;
  balance_used: number;
  balance: number;
  user_id: string;
  item_id: string;
}

interface ArcadeBalanceState {
  arcadeBalance: number;
  loading: boolean;
  refetch: () => void;
}

export default function useArcadeBalance(): ArcadeBalanceState {
  const [balanceRes, setBalanceRes] = useState<ArcadeBalanceInfo>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBalance = async () => {
    try {
      const auth = window.localStorage.getItem('authentication-token');
      if (!auth) return;
      setLoading(true);
      const res = await fetch(GET_ARCADE_TOKEN_BALANCE_API, {
        headers: { authorizationToken: auth },
      });
      if (res.status === 200) {
        const json = await res.json();
        if (json) setBalanceRes(json);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return {
    arcadeBalance: balanceRes?.balance ?? 0,
    refetch: fetchBalance,
    loading,
  };
}
