import { TERMINATE_RENTAL_API_URL } from 'constants/url';

const useTeminateRental = (rentalId: string | undefined) => {
  const terminalRental = async () => {
    const auth = window.localStorage.getItem('authentication-token');
    if (!auth || !rentalId) {
      return;
    }

    const res = await fetch(
      `${TERMINATE_RENTAL_API_URL}?${new URLSearchParams({
        id: rentalId,
      })}`,
      {
        method: 'POST',
        headers: { authorizationToken: auth },
      },
    );
    return res;
  };

  return terminalRental;
};

export default useTeminateRental;
