import { GAMER_ACCOUNT_API } from 'constants/url';
import { Account } from 'types/account';
import useFetch from './useFetch';

const useAllRentals = (): {
  error?: Error;
  account?: Account;
  loadingAccount?: boolean;
} => {
  const auth = window.localStorage.getItem('authentication-token');
  let headers;
  if (auth) headers = { authorizationToken: auth };
  const { error, data, loading } = useFetch<Account>(GAMER_ACCOUNT_API, {
    headers,
  });
  return { error, account: data, loadingAccount: loading };
};

export default useAllRentals;
