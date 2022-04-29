import { useEffect, useState } from 'react';
import {
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  // Radio,
  // RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import MyRentalsDataGrid from './MyRentalsDataGrid';
import { MY_RENTAL_API_URL, TERMINAL_RENTAL_API_URL } from 'constants/url';
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
  const { data } = useFetch<Rentals[]>(MY_RENTAL_API_URL, {
    headers,
  });
  const [rentails, setRentails] = useState<Rentals[] | any>([]);

  useEffect(() => {
    if (data) {
      setRentails(data);
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
      const newRentails = rentails.find((ren) => ren.id === res.id);
      const rentalIndex = rentails.findIndex((ren) => ren.id === res.id);

      setRentails([
        ...rentails.slice(0, rentalIndex),
        newRentails,
        ...rentails.slice(rentalIndex + 1),
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

  const handleSearch = (currentValue: string) => {
    if (currentValue?.trim() === '') {
      setRentails(data);
      return;
    }
    const newRental: any = data?.filter((rental: any) =>
      rental.renter_id.toLowerCase().includes(currentValue),
    );
    setRentails(newRental);
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
          {/* <FormControl sx={{ flexDirection: 'row' }}>
            <FormLabel
              component="legend"
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '12px',
              }}
              focused={false}
            >
              Show Scholars Only?
            </FormLabel>
            <RadioGroup name="scholars-only" row>
              <FormControlLabel control={<Radio value="yes" />} label="Yes" />
              <FormControlLabel control={<Radio value="no" />} label="No" />
            </RadioGroup>
          </FormControl> */}
          <SearchRental handleSearch={handleSearch} />
        </Stack>
      </Stack>

      <Box height={700}>
        <MyRentalsDataGrid
          loading={!data}
          rows={rentails}
          handleTerminalRental={terminalRentalById}
        />
      </Box>
    </Stack>
  );
};

export default DashboardRentalPage;
