import { Button, Grid, Stack } from '@mui/material';
import SectionTitle from 'components/sections/SectionTitle';
import RentalsTableSimple from './RentalsTableSimple';
import { sectionSpacing } from 'store/constant';
import { ALL_RENTAL_API_URL } from 'constants/url';
import useFetch from 'hooks/useFetch';
import usePlayerProfile from 'hooks/usePlayerProfile';
import { useState, useEffect } from 'react';
import { Rentals } from 'types/rentals';
import { transformRentals } from 'pages/dashboard/utils';
import { Link } from 'react-router-dom';

export interface ColumnType {
  id:
    | 'renter'
    | 'nickname'
    | 'degenId'
    | 'winRate'
    | 'profits'
    | 'netEarning'
    | 'roi'
    | 'rentalRenewsIn';
  label: string;
  minWidth?: number;
  align?: 'center';
}

const columns: ColumnType[] = [
  { id: 'renter', label: 'Player Address', minWidth: 150, align: 'center' },
  {
    id: 'nickname',
    label: 'Player Nickname',
    minWidth: 150,
  },
  { id: 'degenId', label: 'Degen ID', minWidth: 100, align: 'center' },
  { id: 'winRate', label: 'Win Rate (%)', minWidth: 120, align: 'center' },
  {
    id: 'profits',
    label: 'Gross Gameplay Earnings',
    minWidth: 200,
    align: 'center',
  },
  {
    id: 'netEarning',
    label: 'Your NET Earnings',
    minWidth: 150,
    align: 'center',
  },
  { id: 'roi', label: 'ROI %', minWidth: 80, align: 'center' },
  {
    id: 'rentalRenewsIn',
    label: 'Rental Renews In',
    minWidth: 150,
    align: 'center',
  },
];

const MyRentals = (): JSX.Element => {
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

  const { profile } = usePlayerProfile();

  const [rentals, setRentals] = useState<Rentals[] | any>([]);

  useEffect(() => {
    if (data) {
      setRentals(data);
    }
  }, [data]);

  const rows = transformRentals(rentals, profile?.id || '');

  return (
    <Grid container spacing={sectionSpacing} sx={{ height: '100%' }}>
      <Grid item xs={12}>
        <SectionTitle
          firstSection
          actions={
            <Stack direction="row" gap={2}>
              <Button
                variant="outlined"
                component={Link}
                to="/dashboard/rentals"
              >
                View All Rentals
              </Button>
            </Stack>
          }
        >
          My Rentals
        </SectionTitle>
      </Grid>
      <Grid item xs={12} sx={{ height: '100%' }}>
        <RentalsTableSimple rentals={rows} columns={columns} />
      </Grid>
    </Grid>
  );
};

export default MyRentals;
