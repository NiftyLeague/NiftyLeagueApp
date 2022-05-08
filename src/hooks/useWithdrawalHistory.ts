import { useCallback, useEffect, useState } from 'react';
import { WITHDRAW_NFTL_LIST } from 'constants/url';
import { WithdrawalHistory } from 'types/account';

const useWithdrawalHistory = () => {
  const [withdrawalHistory, setWithdrawalHistory] = useState<
    WithdrawalHistory[]
  >([]);
  const auth = window.localStorage.getItem('authentication-token');

  const fetchWithdrawalHistory = useCallback(async () => {
    if (auth) {
      const res = await fetch(`${WITHDRAW_NFTL_LIST}?state=pending`, {
        headers: { authorizationToken: auth },
      });
      if (res && res.status === 200) setWithdrawalHistory(await res.json());
    }
  }, [auth]);

  useEffect(() => {
    if (auth) fetchWithdrawalHistory();
  }, [auth, fetchWithdrawalHistory]);

  return withdrawalHistory.sort((a, b) => b.created_at - a.created_at);
};

export default useWithdrawalHistory;
