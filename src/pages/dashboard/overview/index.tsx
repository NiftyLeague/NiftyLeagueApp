import { Grid } from '@mui/material';
import MyComics from './MyComics';
import MyDegens from './MyDegens';
import MyNFTL from './MyNFTL';
import MyRentals from './MyRentals';

const DashboardOverview = (): JSX.Element => (
  <Grid
    container
    flexDirection="row"
    spacing={4}
    sx={{ maxHeight: 'cacl(100vh - 100px)' }}
  >
    <Grid item xs={12} md={12} lg={5}>
      <Grid container flexDirection="column" spacing={6}>
        <Grid item xs={12}>
          <MyNFTL />
        </Grid>
        <Grid item xs={12}>
          <MyRentals />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} md={12} lg={7}>
      <Grid container flexDirection="column" spacing={6}>
        <Grid item xs={12}>
          <MyDegens />
        </Grid>
        <Grid item xs={12}>
          <MyComics />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default DashboardOverview;
