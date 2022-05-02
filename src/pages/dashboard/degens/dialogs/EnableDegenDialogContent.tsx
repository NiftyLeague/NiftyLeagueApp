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
} from '@mui/material';
import { useState } from 'react';
import { Degen } from 'types/degens';
import { DEGEN_BASE_IMAGE_URL, DISABLE_RENT_API_URL } from 'constants/url';
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
          isEnabled ? 'deactivate' : 'activate'
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
              image={`${DEGEN_BASE_IMAGE_URL}/mainnet/images/${degen?.id}.png`}
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
                Disabling your rental makes your rental queue private. Note that
                your queue will clear as existing rentals reach the already
                paid-for expiration. Re-enabling fee is 1000 NFTL.
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
                  I understand and agree the terms above.
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
