import { useEffect, useState } from 'react';
import { DEGEN_BASE_BACKGROUND_URL } from 'constants/url';

const useBackgroundType = (
  tokenId: string | number,
  isMounted: boolean,
): [boolean, boolean, string] => {
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState('Not Found');
  const [error, setError] = useState(false);
  const backgroundAPI = `${DEGEN_BASE_BACKGROUND_URL}/mainnet/degen/${tokenId}/background`;

  useEffect(() => {
    const resolveBackground = async () => {
      try {
        if (isMounted) {
          const result = await fetch(backgroundAPI, { cache: 'force-cache' });
          if (result.status === 404) {
            setError(true);
          } else {
            const bg = await result.text();
            setBackground(bg);
            setLoading(false);
          }
        }
      } catch (err) {
        if (isMounted) setError(true);
      }
    };
    // eslint-disable-next-line no-void
    if (tokenId && isMounted) void resolveBackground();
  }, [tokenId, isMounted, backgroundAPI]);

  return [loading, error, background];
};

export default useBackgroundType;
