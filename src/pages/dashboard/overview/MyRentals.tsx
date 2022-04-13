import { Button, Grid, Stack } from '@mui/material';
import SectionTitle from 'components/sections/SectionTitle';
import RentalsTableSimple from './RentalsTableSimple';
import { gridSpacing } from 'store/constant';

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

const createRentail = (
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

const retails = [
  createRentail('SEIYA', '3743', '12x', '98%', '187,325', 200, '17:03:17'),
  createRentail('SEIYA', '3743', '12x', '98%', '187,325', -200, '17:03:17'),
  createRentail('SEIYA', '3743', '12x', '98%', '187,325', 0, '17:03:17'),
];

const MyRentals = ({ onViewAllRentals }: MyRentalsProps): JSX.Element => (
  <Grid container spacing={gridSpacing}>
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
      <RentalsTableSimple retails={retails} columns={columns} />
    </Grid>
  </Grid>
);

export default MyRentals;
