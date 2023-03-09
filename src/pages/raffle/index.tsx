import { Grid } from '@mui/material';
import RafflePic from 'assets/images/events/raffle.png';
import Raffle from './Raffle';
import MyNFTL from './MyNFTL';

const RaffleOverview = (): JSX.Element => {
  return (
    <Grid
      container
      flexDirection="row"
      spacing={4}
      sx={{ maxHeight: 'cacl(100vh - 100px)' }}
    >
      <Grid item xs={12} md={12} lg={6}>
        <Grid container flexDirection="column" spacing={4}>
          <Grid item xs={12}>
            <Raffle />
          </Grid>
          <Grid item xs={12}>
            <MyNFTL />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Grid container flexDirection="column" spacing={1}>
          <Grid item xs={12} textAlign="center">
            <iframe
              src="https://dune.com/embeds/2181657/3574299"
              height="150"
              width="500"
              title="Total NFTL Burnt"
              style={{ backgroundColor: 'cornsilk', maxWidth: '100%' }}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <img
              src={RafflePic}
              alt="Nifty Raffle"
              width="100%"
              style={{ maxWidth: 500 }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RaffleOverview;
