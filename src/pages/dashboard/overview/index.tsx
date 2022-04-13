import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MyNFTL from './MyNFTL';
import MyRentals from './MyRentals';
import MyDegens from './MyDegens';
import MyComics from './MyComics';

const DashboardOverview = (): JSX.Element => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={12}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={5}>
          <MyNFTL />
        </Grid>
        <Grid item xs={12} md={7}>
          <MyRentals />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={8}>
          <MyDegens />
        </Grid>
        <Grid item xs={4}>
          <MyComics />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default DashboardOverview;
