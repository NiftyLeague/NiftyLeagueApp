import { DEGEN_BASE_BACKGROUND_URL } from 'constants/url';
import useFetch from './useFetch';

const useBackgroundType = (
  tokenId: string | number,
): { loading?: boolean; error?: Error; background?: string } => {
  const backgroundAPI = `${DEGEN_BASE_BACKGROUND_URL}/mainnet/degen/${tokenId}/background`;
  const {
    loading,
    error,
    data: background,
  } = useFetch<string>(backgroundAPI, undefined, true);
  return { loading, error, background };
};

export default useBackgroundType;
