import { MY_PROFILE_API_URL } from 'constants/url';
import { Profile } from 'types/account';
import useAuth from './useAuth';
import useFetch from './useFetch';

const usePlayerProfile = (): {
  error?: Error;
  profile?: Profile;
  loadingProfile?: boolean;
} => {
  const { authToken } = useAuth();
  let headers;
  if (authToken) headers = { authorizationToken: authToken };
  const { error, data, loading } = useFetch<Profile>(MY_PROFILE_API_URL, {
    headers,
  });
  return { error, profile: data, loadingProfile: loading };
};

export default usePlayerProfile;
