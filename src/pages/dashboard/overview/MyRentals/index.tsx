import { Button, Grid, Stack } from '@mui/material';
import SectionTitle from 'components/sections/SectionTitle';
import RentalsTableSimple from './RentalsTableSimple';
import { sectionSpacing } from 'store/constant';

interface MyRentalsProps {
  onViewAllRentals?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ColumnType {
  id:
    | 'renter'
    | 'degenId'
    | 'multiplier'
    | 'winLoss'
    | 'totalEarnings'
    | 'roi'
    | 'rentalRenewsIn';
  label: string;
  minWidth?: number;
  align?: 'center';
}

const columns: ColumnType[] = [
  { id: 'renter', label: 'Renter', minWidth: 50, align: 'center' },
  { id: 'degenId', label: 'Degen ID', minWidth: 50, align: 'center' },
  { id: 'multiplier', label: 'Multiplier', minWidth: 50, align: 'center' },
  { id: 'winLoss', label: 'Win-Loss', minWidth: 50, align: 'center' },
  {
    id: 'totalEarnings',
    label: 'NFTL Generated',
    minWidth: 100,
    align: 'center',
  },
  { id: 'roi', label: 'ROI %', minWidth: 50, align: 'center' },
  {
    id: 'rentalRenewsIn',
    label: 'Rental Renews In',
    minWidth: 100,
    align: 'center',
  },
];

const createRental = (
  renter: string,
  degenId: string,
  multiplier: string,
  winLoss: string,
  totalEarnings: string,
  roi: number,
  rentalRenewsIn: string,
) => ({
  renter,
  degenId,
  multiplier,
  winLoss,
  totalEarnings,
  roi,
  rentalRenewsIn,
});

const rentals = [
  createRental('SEIYA', '3743', '12x', '98%', '187,325', 200, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', -200, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', 0, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', 0, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', 0, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', -200, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', 0, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', 0, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', 100, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', -200, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', 100, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', 0, '17:03:17'),
  createRental('SEIYA', '3743', '12x', '98%', '187,325', 0, '17:03:17'),
];

const MyRentals = ({ onViewAllRentals }: MyRentalsProps): JSX.Element => (
  <Grid container spacing={sectionSpacing}>
    <Grid item xs={12}>
      <SectionTitle
        firstSection
        actions={
          <Stack direction="row" gap={2}>
            <Button variant="outlined" onClick={onViewAllRentals}>
              View All Rentals
            </Button>
          </Stack>
        }
      >
        My Rentals
      </SectionTitle>
    </Grid>
    <Grid item xs={12}>
      <RentalsTableSimple rentals={rentals} columns={columns} />
    </Grid>
  </Grid>
);

export default MyRentals;
