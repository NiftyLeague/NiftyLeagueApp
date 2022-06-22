import { Button, Grid, Stack } from '@mui/material';
import SectionTitle from 'components/sections/SectionTitle';
import RentalsTableSimple from './RentalsTableSimple';
import { sectionSpacing } from 'store/constant';
import usePlayerProfile from 'hooks/usePlayerProfile';
import { FC } from 'react';
import { Rentals } from 'types/rentals';
import { transformRentals } from 'pages/dashboard/utils';
import { Link } from 'react-router-dom';

export interface ColumnType {
  id:
    | 'renter'
    | 'playerNickname'
    | 'degenId'
    | 'winRate'
    | 'profits'
    | 'netEarning'
    | 'roi'
    | 'earningCap'
    | 'earningCapProgress'
    | 'rentalRenewsIn';
  label: string;
  minWidth?: number;
  align?: 'center';
}

const columns: ColumnType[] = [
  { id: 'renter', label: 'Player Address', minWidth: 150, align: 'center' },
  {
    id: 'playerNickname',
    label: 'Player Nickname',
    minWidth: 150,
  },
  {
    id: 'earningCap',
    label: 'Earning Cap',
    minWidth: 150,
  },
  {
    id: 'rentalRenewsIn',
    label: 'Rental Renews In',
    minWidth: 150,
    align: 'center',
  },
  { id: 'degenId', label: 'Degen ID', minWidth: 100, align: 'center' },
  { id: 'winRate', label: 'Win Rate', minWidth: 120, align: 'center' },
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
];
interface MyRentalsProps {
  rentals: Rentals[];
}
const MyRentals: FC<MyRentalsProps> = ({ rentals }): JSX.Element => {
  const { profile } = usePlayerProfile();

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
