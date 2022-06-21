import { GET_GAMER_PROFILE_API } from 'constants/url';
import { Profile } from 'types/account';
import useFetch from '../useFetch';

const useGamerProfile = (): {
  error?: Error;
  profile?: Profile;
  loadingProfile?: boolean;
  fetchUserProfile?: any;
} => {
  const auth = window.localStorage.getItem('authentication-token');
  let headers;
  if (auth) headers = { authorizationToken: auth };
  const { error, data, loading } = useFetch<Profile>(GET_GAMER_PROFILE_API, {
    headers,
  });

  const fetchUserProfile = async () => {
    const res = await fetch(GET_GAMER_PROFILE_API, {
      headers,
    });
    if (res.status === 404) {
      throw Error('Not Found');
    }
    if (res.status === 200) {
      const json = await res.json();
      if (json.statusCode === 400) {
        throw Error(json.body);
      }
      return json as Profile;
    }
    throw Error('Something wrong!');
  };

  return {
    error,
    profile: data,
    loadingProfile: loading,
    fetchUserProfile,
  };
};

export default useGamerProfile;
