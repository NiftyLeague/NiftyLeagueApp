import { useEffect, useState } from 'react';
import { GET_ARCADE_TOKEN_BALANCE_API } from 'constants/url';

/*
  ~ What it does? ~

  Gets your arcade balance

  ~ How can I use? ~

  const {arcadeBalance, refetch, loading} = useArcadeBalance();
*/

interface ArcadeBalanceInfo {
  arcadeBalance: string;
  loading: boolean;
  refetch: () => void;
}

export default function useArcadeBalance(): ArcadeBalanceInfo {
  const [balance, setBalance] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBalance = async () => {
    try {
      const auth = window.localStorage.getItem('authentication-token');
      if (!auth) {
        return;
      }
      setLoading(true);
      const res = await fetch(GET_ARCADE_TOKEN_BALANCE_API, {
        headers: { authorizationToken: auth },
      });
      if (res.status === 200) {
        const amount = await res.text();
        if (amount && amount !== 'null') setBalance(amount);
        else setBalance('');
      } else {
        setBalance('');
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return { arcadeBalance: balance, refetch: fetchBalance, loading };
}
