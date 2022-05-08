import { useEffect, useState } from 'react';
import { DEGEN_BASE_BACKGROUND_URL } from 'constants/url';

const useBackgroundType = (
  tokenId: string | number,
): [boolean, boolean, string] => {
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState('Not Found');
  const [error, setError] = useState(false);

  const backgroundAPI = `${DEGEN_BASE_BACKGROUND_URL}/mainnet/degen/${tokenId}/background`;

  useEffect(() => {
    const resolveBackground = async () => {
      try {
        const result = await fetch(backgroundAPI, { cache: 'force-cache' });
        if (result.status === 404) {
          setError(true);
          return;
        }
        setBackground(await result.text());
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };
    if (tokenId && background === 'Not Found') resolveBackground();
  }, [tokenId, background, backgroundAPI]);

  return [loading, error, background];
};

export default useBackgroundType;
