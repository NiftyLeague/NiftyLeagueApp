import { MY_PROFILE_API_URL } from 'constants/url';
import { Profile } from 'types/account';
import useFetch from './useFetch';

const usePlayerProfile = (): {
  error?: Error;
  profile?: Profile;
} => {
  const auth = window.localStorage.getItem('authentication-token');
  let headers;
  if (auth) headers = { authorizationToken: auth };
  const { error, data } = useFetch<Profile>(MY_PROFILE_API_URL, { headers });
  return { error, profile: data };
};

export default usePlayerProfile;
