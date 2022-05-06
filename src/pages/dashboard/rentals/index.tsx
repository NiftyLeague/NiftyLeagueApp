import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MyRentalsDataGrid from './MyRentalsDataGrid';
import { ALL_RENTAL_API_URL, TERMINAL_RENTAL_API_URL } from 'constants/url';
import useFetch from 'hooks/useFetch';
import { Rentals } from 'types/rentals';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import SearchRental from './SearchRental';

const DashboardRentalPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const authToken = window.localStorage.getItem('authentication-token');

  let headers;
  if (authToken) {
    headers = {
      authorizationToken: authToken,
    };
  }
  const { data } = useFetch<Rentals[]>(ALL_RENTAL_API_URL, {
    headers,
  });
  const [rentals, setRentals] = useState<Rentals[] | any>([]);

  useEffect(() => {
    if (data) {
      setRentals(data);
    }
  }, [data]);

  const terminalRentalById = async (rentalId: string) => {
    try {
      const result: any = await fetch(
        `${TERMINAL_RENTAL_API_URL}?${new URLSearchParams({
          id: rentalId,
        })}`,
        {
          method: 'POST',
          headers,
        },
      );
      const res = await result.json();
      if (res.statusCode === 400) {
        dispatch(
          openSnackbar({
            open: true,
            message: res.body,
            variant: 'alert',
            alert: {
              color: 'error',
            },
            close: false,
          }),
        );
        return;
      }
      dispatch(
        openSnackbar({
          open: true,
          message: 'Terminated success!',
          variant: 'alert',
          alert: {
            color: 'success',
          },
          close: false,
        }),
      );
      const newRentals = rentals.find((ren) => ren.id === res.id);
      const rentalIndex = rentals.findIndex((ren) => ren.id === res.id);

      setRentals([
        ...rentals.slice(0, rentalIndex),
        newRentals,
        ...rentals.slice(rentalIndex + 1),
      ]);
    } catch (error) {
      dispatch(
        openSnackbar({
          open: true,
          message: error,
          variant: 'alert',
          alert: {
            color: 'error',
          },
          close: false,
        }),
      );
    }
  };

  const updateRentalName = (newName: string, id: string) => {
    const newRentals = rentals.find((ren) => ren.id === id);
    const rentalIndex = rentals.findIndex((ren) => ren.id === id);

    setRentals([
      ...rentals.slice(0, rentalIndex),
      {
        ...newRentals,
        name: newName,
      },
      ...rentals.slice(rentalIndex + 1),
    ]);
  };

  const handleSearch = (currentValue: string) => {
    if (currentValue?.trim() === '') {
      setRentals(data);
      return;
    }
    const newRental: any = data?.filter((rental: any) =>
      rental.renter_id.toLowerCase().includes(currentValue),
    );
    setRentals(newRental);
  };

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        columnGap={4}
        rowGap={1}
      >
        <Typography variant="h2">My Rentals</Typography>

        {/* Header form */}
        <Stack
          direction="row"
          alignItems="center"
          rowGap={1}
          columnGap={2}
          flexWrap="wrap"
        >
          <SearchRental handleSearch={handleSearch} />
        </Stack>
      </Stack>

      <Box height={700}>
        <MyRentalsDataGrid
          loading={!data}
          rows={rentals}
          handleTerminalRental={terminalRentalById}
          updateRentalName={updateRentalName}
        />
      </Box>
    </Stack>
  );
};

export default DashboardRentalPage;
