import { useCallback, useEffect, useState } from 'react';
import { WITHDRAW_NFTL_LIST } from 'constants/url';
import { WithdrawalHistory } from 'types/account';

const useWithdrawalHistory = (state?: WithdrawalHistory['state']) => {
  const [loading, setLoading] = useState(true);
  const [withdrawalHistory, setWithdrawalHistory] = useState<
    WithdrawalHistory[]
  >([]);
  const auth = window.localStorage.getItem('authentication-token');

  const fetchWithdrawalHistory = useCallback(async () => {
    if (auth) {
      const res = await fetch(
        `${WITHDRAW_NFTL_LIST}${state ? `?state=${state}` : ''}`,
        {
          headers: { authorizationToken: auth },
        },
      );
      if (res && res.status === 200) setWithdrawalHistory(await res.json());
      setLoading(false);
    }
  }, [auth, state]);

  useEffect(() => {
    if (auth) fetchWithdrawalHistory();
  }, [auth, fetchWithdrawalHistory]);

  return {
    loading,
    withdrawalHistory: withdrawalHistory.sort(
      (a, b) => b.created_at - a.created_at,
    ),
  };
};

export default useWithdrawalHistory;
