import { ALL_RENTAL_API_URL } from 'constants/url';
import { Rentals } from 'types/rentals';
import useAuth from './useAuth';
import useFetch from './useFetch';

const useAllRentals = (): {
  error?: Error;
  rentals?: Rentals[];
  loadingRentals?: boolean;
} => {
  const { authToken } = useAuth();
  let headers;
  if (authToken) headers = { authorizationToken: authToken };
  const { error, data, loading } = useFetch<Rentals[]>(ALL_RENTAL_API_URL, {
    headers,
  });
  return { error, rentals: data, loadingRentals: loading };
};

export default useAllRentals;
