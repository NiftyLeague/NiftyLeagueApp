import { RENT_URL } from 'constants/url';
import { MyRental } from 'types/rental';

const useRent = (
  degenId: string | undefined,
  position: number,
  price: number | undefined,
  address: string,
): (() => Promise<MyRental | undefined>) => {
  const rent = async (): Promise<MyRental | undefined> => {
    const auth = window.localStorage.getItem('authentication-token');
    if (!auth || !degenId || !price) {
      return undefined;
    }

    const res = await fetch(RENT_URL, {
      method: 'POST',
      headers: { authorizationToken: auth },
      body: JSON.stringify({
        degen_id: degenId,
        position,
        price,
        address,
      }),
    });
    if (res.status === 404) {
      throw Error('Not Found');
    }
    const json = (await res.json()) as MyRental;
    return json;
  };

  return rent;
};

export default useRent;
