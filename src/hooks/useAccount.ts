import { useCallback, useEffect, useState } from 'react';
import { GAMER_ACCOUNT_API } from 'constants/url';
import { Account } from 'types/account';

const useAccount = (
  refreshKey?: string | number,
): { error: boolean; account: Account | undefined } => {
  const auth = window.localStorage.getItem('authentication-token');
  const [account, setAccount] = useState<Account | undefined>(undefined);
  const [error, setAccError] = useState(false);

  const fetchAccount = useCallback(async () => {
    if (auth) {
      const result = await fetch(GAMER_ACCOUNT_API, {
        headers: { authorizationToken: auth },
      })
        .then((res) => {
          if (res.status === 404) setAccError(true);
          return res.text();
        })
        .catch(() => {
          setAccError(true);
        });
      if (result) setAccount(JSON.parse(result));
    }
  }, [auth]);

  useEffect(() => {
    if (auth) fetchAccount();
  }, [auth, fetchAccount, refreshKey]);

  return { error, account };
};

export default useAccount;
