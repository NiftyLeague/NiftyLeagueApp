import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MyComics from './MyComics';
import MyDegens from './MyDegens';
import MyNFTL from './MyNFTL';
import MyRentals from './MyRentals';

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
        <Grid item xs={7}>
          <MyDegens />
        </Grid>
        <Grid item xs={5}>
          <MyComics />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default DashboardOverview;
