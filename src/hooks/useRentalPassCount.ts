import { RENTAL_PASS_INVENTORY_URL } from 'constants/url';
import { useEffect, useState } from 'react';

const useRentalPassCount = (
  degenId: string | undefined,
): [boolean, boolean, number] => {
  const [loading, setLoading] = useState(true);
  const [rentalPassCount, setRentalPassCount] = useState<number>(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function resolveRental() {
      const authToken = window.localStorage.getItem('authentication-token');
      if (!degenId || !authToken) {
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(RENTAL_PASS_INVENTORY_URL, {
          method: 'GET',
          headers: { authorizationToken: authToken },
        });
        if (res.status === 404) {
          throw Error('Not Found');
        }
        const json = await res.json();
        setRentalPassCount(json.balance || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line no-void
    void resolveRental();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [degenId]);

  return [loading, error, rentalPassCount];
};

export default useRentalPassCount;
