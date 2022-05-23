import { GET_GAMER_PROFILE_API } from 'constants/url';
import { Profile } from 'types/account';
import useFetch from '../useFetch';

const useGamerProfile = (): {
  error?: Error;
  profile?: Profile;
  loadingProfile?: boolean;
} => {
  const auth = window.localStorage.getItem('authentication-token');
  let headers;
  if (auth) headers = { authorizationToken: auth };
  const { error, data, loading } = useFetch<Profile>(GET_GAMER_PROFILE_API, {
    headers,
  });
  return { error, profile: data, loadingProfile: loading };
};

export default useGamerProfile;
