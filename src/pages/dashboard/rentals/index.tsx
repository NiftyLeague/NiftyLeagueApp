import { useEffect, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { Box } from '@mui/system';
import MyRentalsDataGrid from './MyRentalsDataGrid';
import { MY_RENTAL_API_URL } from 'constants/url';
import useFetch from 'hooks/useFetch';
import { RentalDataGrid } from 'types/rentalDataGrid';
import { Rentals } from 'types/rentals';

const DashboardRentalPage = (): JSX.Element => {
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
  const [rentails, setRentails] = useState<RentalDataGrid[]>([]);

  useEffect(() => {
    if (data) {
      const tranformRentails: any = data.map(
        ({
          renter_id,
          degen_id,
          degen: { multiplier },
          earning_cap,
          earning_cap_daily,
          stats: { matches_won, matches_total, earnings, charges, time_played },
          next_charge_at,
        }) => ({
          id: degen_id,
          renter: renter_id,
          degenId: degen_id,
          multiplier,
          winLoss:
            matches_won > 0 && matches_total > 0
              ? Number(matches_won) / Number(matches_total)
              : 0,
          timePlayed: time_played
            ? format(new Date(time_played), 'HH:mm:ss')
            : 'N/A',
          totalEarnings: earning_cap,
          yourEarnings: earning_cap_daily,
          costs: charges,
          profits: earnings,
          roi: Number(earnings) / Number(charges),
          rentalRenewsIn: next_charge_at
            ? format(new Date(next_charge_at - Date.now()), 'HH:mm:ss')
            : 'N/A',
          actions: 1,
        }),
      );
      setRentails(tranformRentails);
    }
  }, [data]);

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
          <FormControl sx={{ flexDirection: 'row' }}>
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
          </FormControl>
          <FormControl>
            <TextField
              placeholder="Search players by name or email address"
              name="search"
              variant="outlined"
              fullWidth
              sx={{ minWidth: '480px' }}
            />
          </FormControl>
        </Stack>
      </Stack>

      <Box height={700}>
        <MyRentalsDataGrid loading={!data} rows={rentails} />
      </Box>
    </Stack>
  );
};

export default DashboardRentalPage;
