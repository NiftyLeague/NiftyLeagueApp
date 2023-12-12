'use client';

import { GET_GAMER_PROFILE_API } from '@/constants/url';
import useAuth from '@/hooks/useAuth';
import useFetch from '@/hooks/useFetch';
import { Profile } from '@/types/account';

const useGamerProfile = (): {
  error?: Error;
  profile?: Profile;
  loadingProfile?: boolean;
  fetchUserProfile?: any;
} => {
  const { authToken } = useAuth();
  const headers = { authorizationToken: authToken || '' };

  const { error, data, loading } = useFetch<Profile>(GET_GAMER_PROFILE_API, {
    headers,
    enabled: !!authToken,
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
