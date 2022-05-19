import { ALL_RENTAL_API_URL } from 'constants/url';
import { Rentals } from 'types/rentals';
import useFetch from './useFetch';

const useAllRentals = (): {
  error?: Error;
  rentals?: Rentals[];
} => {
  const auth = window.localStorage.getItem('authentication-token');
  let headers;
  if (auth) headers = { authorizationToken: auth };
  const { error, data } = useFetch<Rentals[]>(ALL_RENTAL_API_URL, { headers });
  return { error, rentals: data };
};

export default useAllRentals;
