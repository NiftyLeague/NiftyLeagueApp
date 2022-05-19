import { ALL_RENTAL_API_URL } from 'constants/url';
import { Rentals } from 'types/rentals';
import useFetch from './useFetch';

const useAllRentals = (): {
  error?: Error;
  rentals?: Rentals[];
  loadingRentals?: boolean;
} => {
  const auth = window.localStorage.getItem('authentication-token');
  let headers;
  if (auth) headers = { authorizationToken: auth };
  const { error, data, loading } = useFetch<Rentals[]>(ALL_RENTAL_API_URL, {
    headers,
  });
  return { error, rentals: data, loadingRentals: loading };
};

export default useAllRentals;
