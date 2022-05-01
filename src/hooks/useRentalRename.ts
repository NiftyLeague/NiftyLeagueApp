import { RENTAL_RENAME_URL } from 'constants/url';

const useRentalRename = (
  degenId: string | undefined,
  rentalId: string | undefined,
  name: string | undefined,
): (() => Promise<void>) => {
  const rent = async () => {
    const auth = window.localStorage.getItem('authentication-token');
    if (!auth || !degenId || !rentalId || !name) {
      return;
    }

    const res = await fetch(RENTAL_RENAME_URL(rentalId), {
      method: 'POST',
      headers: { authorizationToken: auth },
      body: JSON.stringify({
        degen_id: degenId,
        name,
      }),
    });
    if (res.status === 404) {
      throw Error('Not Found');
    }
  };

  return rent;
};

export default useRentalRename;
