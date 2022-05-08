import { useEffect, useRef, useState } from 'react';
import { DEGEN_BASE_BACKGROUND_URL } from 'constants/url';

const useBackgroundType = (
  tokenId: string | number,
): [boolean, boolean, string] => {
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState('Not Found');
  const [error, setError] = useState(false);
  const isMounted = useRef(true);
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  const backgroundAPI = `${DEGEN_BASE_BACKGROUND_URL}/mainnet/degen/${tokenId}/background`;

  useEffect(() => {
    const resolveBackground = async () => {
      try {
        const result = await fetch(backgroundAPI, { cache: 'force-cache' });
        if (result.status === 404) {
          setError(true);
        } else if (isMounted.current) {
          const bg = await result.text();
          setBackground(bg);
          setLoading(false);
        }
      } catch (err) {
        setError(true);
      }
    };
    // eslint-disable-next-line no-void
    if (tokenId && isMounted.current) void resolveBackground();
  }, [tokenId, backgroundAPI]);

  return [loading, error, background];
};

export default useBackgroundType;
