import { Button, Grid, Stack } from '@mui/material';
import SectionTitle from 'components/sections/SectionTitle';
import { gridSpacing } from 'store/constant';

interface MyRentalsProps {
  onViewAllRentals?: React.MouseEventHandler<HTMLButtonElement>;
}

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
        My Rentails
      </SectionTitle>
    </Grid>
  </Grid>
);

export default MyRentals;
