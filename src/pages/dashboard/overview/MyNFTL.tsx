import { Grid, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { sectionSpacing } from 'store/constant';
import SectionTitle from 'components/sections/SectionTitle';
import HoverDataCard from 'components/cards/HoverDataCard';

interface MyNFTLProps {
  onWithdraw?: React.MouseEventHandler<HTMLButtonElement>;
  onClaim?: React.MouseEventHandler<HTMLButtonElement>;
  onClaimAll?: React.MouseEventHandler<HTMLButtonElement>;
}

const MyNFTL = ({
  onWithdraw,
  onClaim,
  onClaimAll,
}: MyNFTLProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Grid container spacing={sectionSpacing}>
      <Grid item xs={12}>
        <SectionTitle
          firstSection
          actions={
            <Stack direction="row" gap={2}>
              <Button variant="outlined" onClick={onClaimAll}>
                Claim All 400,736 NFTL
              </Button>
            </Stack>
          }
        >
          My NFTL
        </SectionTitle>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={sectionSpacing}>
          <Grid item sm={6} xs={12}>
            <HoverDataCard
              title="NFTL in Wallet"
              primary="4,573,983"
              customStyle={{
                backgroundColor: theme.palette.primary.dark,
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Grid container spacing={sectionSpacing}>
              <Grid item xs={12}>
                <HoverDataCard
                  title="All-Time Rental Earnings"
                  primary="300,573"
                  customStyle={{
                    backgroundColor: theme.palette.primary.dark,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <HoverDataCard
                  title="All-Time Game Earnings"
                  primary="300,573"
                  customStyle={{
                    backgroundColor: theme.palette.primary.dark,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={sectionSpacing}>
          <Grid item sm={6} xs={12}>
            <HoverDataCard
              title="Game & Rental Balance"
              primary="114,983"
              customStyle={{ backgroundColor: theme.palette.primary.dark }}
              secondary="Available to Claim"
              actions={
                <Button fullWidth variant="contained" onClick={onWithdraw}>
                  Withdraw
                </Button>
              }
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <HoverDataCard
              title="Daily NFTL Accrued"
              primary="300,573 NFTL"
              customStyle={{ backgroundColor: theme.palette.primary.dark }}
              secondary="Available to Claim"
              actions={
                <Button fullWidth variant="contained" onClick={onClaim}>
                  Claim NFTL
                </Button>
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyNFTL;
