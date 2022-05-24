import { useEffect, useState } from 'react';
import { Stack, Typography, FormControl, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import MyRentalsDataGrid from './MyRentalsDataGrid';
import {
  ALL_RENTAL_API_URL,
  MY_RENTAL_API_URL,
  RENTED_FROM_ME_API_URL,
  TERMINAL_RENTAL_API_URL,
} from 'constants/url';
import { Rentals, RentalType } from 'types/rentals';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import SearchRental from './SearchRental';
import InputLabel from '../../../components/extended/Form/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useQuery } from 'react-query';
import { getUniqueListBy } from 'utils/array';

const DashboardRentalPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const authToken = window.localStorage.getItem('authentication-token');
  const [rentals, setRentals] = useState<Rentals[] | any>([]);
  const [category, setCategory] = useState<RentalType>('all');

  let headers;
  if (authToken) {
    headers = {
      authorizationToken: authToken,
    };
  }

  const getFetchUrl = (): string => {
    switch (category) {
      case 'owned-sponsorship':
      case 'non-owned-sponsorship':
        return ALL_RENTAL_API_URL;

      case 'direct-rental':
      case 'recruited':
        return MY_RENTAL_API_URL;

      case 'direct-renter':
        return RENTED_FROM_ME_API_URL;

      default:
        return ALL_RENTAL_API_URL;
    }
  };

  const fetchRentals = async (): Promise<Rentals[]> => {
    if (category === 'all') {
      const [allRentalsResponse, rentedFromMeResponse, myRentalsResponse] =
        await Promise.all([
          fetch(ALL_RENTAL_API_URL, {
            method: 'GET',
            headers,
          }),
          fetch(RENTED_FROM_ME_API_URL, {
            method: 'GET',
            headers,
          }),
          fetch(MY_RENTAL_API_URL, {
            method: 'GET',
            headers,
          }),
        ]);

      const allRentals = (await allRentalsResponse.json()) as any[];
      const rentedFromMe = (await rentedFromMeResponse.json()) as any[];
      const myRentals = (await myRentalsResponse.json()) as any[];
      const totalRentals = allRentals.concat(rentedFromMe).concat(myRentals);
      return getUniqueListBy(totalRentals, 'id');
    } else {
      const response = await fetch(getFetchUrl(), {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      return data;
    }
  };

  const { data, isLoading, isFetching, refetch } = useQuery<Rentals[]>(
    'rentals',
    fetchRentals,
    {
      enabled: false,
      onSuccess: (response) => {
        if (response.length) {
          return setRentals(response);
        }
        return setRentals([]);
      },
    },
  );

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

      refetch();
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
    refetch();
  };

  const handleSearch = (currentValue: string) => {
    if (currentValue?.trim() === '') {
      setRentals(data);
      return;
    }
    const newRental: any = data?.filter(
      (rental: any) =>
        rental?.accounts?.player?.address
          .toLowerCase()
          .includes(currentValue) ||
        rental?.degen?.id.toLowerCase().includes(currentValue) ||
        rental?.accounts?.player?.name.toLowerCase().includes(currentValue),
    );
    setRentals(newRental);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    const newCategory = event.target.value as RentalType;
    if (newCategory !== category) {
      setCategory(newCategory);
      setRentals([]);
    } else {
      refetch();
    }
  };

  useEffect(() => {
    refetch();
  }, [category, refetch]);

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        columnGap={3}
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
          <FormControl sx={{ minWidth: '200px' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Category"
              onChange={handleChangeCategory}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="direct-rental">Direct Rental</MenuItem>
              <MenuItem value="recruited">Recruited</MenuItem>
              <MenuItem value="owned-sponsorship">Owned Sponsorship</MenuItem>
              <MenuItem value="non-owned-sponsorship">
                Non-Owned Sponsorship
              </MenuItem>
              <MenuItem value="direct-renter">Direct Renter</MenuItem>
              <MenuItem value="terminated">Terminated</MenuItem>
              <MenuItem value="full-history">Full History</MenuItem>
            </Select>
          </FormControl>
          <SearchRental handleSearch={handleSearch} />
        </Stack>
      </Stack>

      <Box height="calc(100vh - 208px)">
        <MyRentalsDataGrid
          loading={isLoading || isFetching}
          rows={rentals}
          category={category}
          handleTerminalRental={terminalRentalById}
          updateRentalName={updateRentalName}
        />
      </Box>
    </Stack>
  );
};

export default DashboardRentalPage;
