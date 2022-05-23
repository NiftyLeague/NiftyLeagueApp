import { GET_PROFILE_AVATARS_AND_COST_API } from 'constants/url';
import useFetch from '../useFetch';

const useProfileAvatarFee = (): {
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
  }>(GET_PROFILE_AVATARS_AND_COST_API, {
    headers,
  });
  return { errorFee: error, fee: data?.price, loadingFee: loading };
};

export default useProfileAvatarFee;
