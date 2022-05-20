import { RENAME_PROFILE_NAME } from 'constants/url';
import useFetch from './useFetch';

const useProfileRenameFee = (): {
  errorFee?: Error;
  fee?: number;
  loadingFee?: boolean;
} => {
  const auth = window.localStorage.getItem('authentication-token');
  let headers;
  if (auth) headers = { authorizationToken: auth };
  const { error, data, loading } = useFetch<{
    id: string;
    price: number;
  }>(RENAME_PROFILE_NAME, {
    headers,
  });
  return { errorFee: error, fee: data?.price, loadingFee: loading };
};

export default useProfileRenameFee;
