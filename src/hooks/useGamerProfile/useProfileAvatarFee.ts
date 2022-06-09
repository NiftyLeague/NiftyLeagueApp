import { ProfileAvatar } from 'types/account';
import { GET_PROFILE_AVATARS_AND_COST_API } from 'constants/url';
import useFetch from '../useFetch';

interface ProfileAvatarsRes {
  id: string;
  avatars: ProfileAvatar[];
  price: number;
}
const useProfileAvatarFee = (): {
  errorAvatarsAndFee?: Error;
  avatarsAndFee?: ProfileAvatarsRes;
  loadingAvatarsAndFee?: boolean;
} => {
  const auth = window.localStorage.getItem('authentication-token');
  let headers;
  if (auth) headers = { authorizationToken: auth };
  const { error, data, loading } = useFetch<ProfileAvatarsRes>(
    GET_PROFILE_AVATARS_AND_COST_API,
    {
      headers,
    },
  );
  return {
    errorAvatarsAndFee: error,
    avatarsAndFee: data,
    loadingAvatarsAndFee: loading,
  };
};

export default useProfileAvatarFee;
