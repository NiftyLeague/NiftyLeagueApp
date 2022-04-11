import {
  DialogTitle,
  DialogContent,
  Stack,
  CardMedia,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
  Link,
} from '@mui/material';
import { Rental } from 'types/rental';

interface Props {
  rental: Rental | null;
}

const RenameRentalDialogContent = ({ rental }: Props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const id = rental?.id;
  return (
    <>
      <DialogTitle sx={{ textAlign: 'center' }}>Rename Rental</DialogTitle>
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
              Owned by {rental?.renter}
            </Typography>
          </Stack>
          <TextField
            label="Enter new degen name"
            name="new-degen-name"
            variant="outlined"
            size="small"
            fullWidth
          />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">Renaming Fee</Typography>
            <Typography>1,000 NFTL</Typography>
          </Stack>
          <FormControl>
            <FormControlLabel
              label={
                <Typography variant="caption">
                  I have read the{' '}
                  <Link href="https://example.com">terms & conditions</Link>{' '}
                  regarding renaming a rental
                </Typography>
              }
              control={<Checkbox />}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" fullWidth>
          Rename Rental
        </Button>
      </DialogActions>
    </>
  );
};

export default RenameRentalDialogContent;
