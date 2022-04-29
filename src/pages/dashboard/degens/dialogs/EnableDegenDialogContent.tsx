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
import { useState } from 'react';
import { Degen } from 'types/degens';
import { DISABLE_RENT_API_URL } from 'constants/url';
import { toast } from 'react-toastify';

interface Props {
  degen?: Degen;
  isEnabled?: boolean;
  onSuccess?: () => void;
}

const EnableDisableDegenDialogContent = ({
  degen,
  isEnabled,
  onSuccess,
}: Props): JSX.Element => {
  const auth = window.localStorage.getItem('authentication-token');
  const [agreement, setAgreement] = useState(false);

  const handleButtonClick = async () => {
    if (auth && degen) {
      const res = await fetch(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${DISABLE_RENT_API_URL}${
          degen.is_active ? 'deactivate' : 'activate'
        }?degen_id=${degen.id}`,
        {
          method: 'POST',
          headers: { authorizationToken: auth },
        },
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (json.statusCode) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        toast.error(json.body);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return

        onSuccess?.();
      }
    }
  };

  return (
    <>
      <DialogTitle sx={{ textAlign: 'center' }}>
        {isEnabled ? 'Disable' : 'Enable'} Degen #{degen?.id} Rentals
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
              control={
                <Checkbox
                  value={agreement}
                  onChange={(event) => setAgreement(event.target.checked)}
                />
              }
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          disabled={!agreement}
          onClick={handleButtonClick}
        >
          {isEnabled ? 'Disable' : 'Enable'} Degen #{degen?.id} Rentals
        </Button>
      </DialogActions>
    </>
  );
};

EnableDisableDegenDialogContent.defaultProps = {
  isEnabled: false,
};

export default EnableDisableDegenDialogContent;
