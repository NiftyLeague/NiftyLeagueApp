import {
  DialogTitle,
  DialogContent,
  Stack,
  CardMedia,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
  Link,
} from '@mui/material';
import { Degen } from 'types/degens';

interface Props {
  degen?: Degen;
  isEnabled?: boolean;
}

const EnableDisableDegenDialogContent = ({
  degen,
  isEnabled = false,
}: Props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const id = degen?.id;
  return (
    <>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {isEnabled ? 'Disable' : 'Enable'} Degen #{id} Rentals
      </DialogTitle>
      <DialogContent dividers sx={{ maxWidth: '320px' }}>
        <Stack rowGap={2}>
          <Stack rowGap={1}>
            <CardMedia
              component="img"
              image="https://nifty-league.s3.amazonaws.com/degens/mainnet/images/108.png"
              alt="degen"
              sx={{ aspectRatio: '1/1', width: '240px', margin: '0 auto' }}
            />
            <Typography
              variant="caption"
              component="p"
              sx={{ textAlign: 'center' }}
            >
              Owned by {degen?.owner}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="center" mb={1}>
            {isEnabled ? (
              <Typography align="center">
                Disabling your renal allows you to rent your rental to only
                specific wallets (by using our rent for someone system) and
                avoid the rental price curve. Keep in mind that enabling your
                degen for rentals incurs a 1000 NFTL fee.
              </Typography>
            ) : (
              <Typography align="center">
                Enable Rental Fee 1000 NFTL
              </Typography>
            )}
          </Stack>
          <FormControl>
            <FormControlLabel
              label={
                <Typography variant="caption">
                  I have read the{' '}
                  <Link href="https://example.com">terms & conditions</Link>{' '}
                  regarding disabling a rental
                </Typography>
              }
              control={<Checkbox />}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" fullWidth>
          {isEnabled ? 'Disable' : 'Enable'} Degen #{id} Rentals
        </Button>
      </DialogActions>
    </>
  );
};

EnableDisableDegenDialogContent.defaultProps = {
  isEnabled: false,
};

export default EnableDisableDegenDialogContent;
