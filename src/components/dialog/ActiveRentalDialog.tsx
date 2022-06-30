import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
import DegenImage from 'components/cards/DegenCard/DegenImage';
import ProgressBar from 'components/ProgressBar';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import { Rentals } from 'types/rentals';

interface ActiveRentalDialogProps {
  degenId: string | number;
  rental: Rentals;
}

const ActiveRentalDialog = ({ degenId, rental }: ActiveRentalDialogProps) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const progressValue = (100 / rental.earning_cap) * rental.earning_cap_daily;
  const activeRental = localStorage.getItem('active_rental');
  const [isOpen, setIsOpen] = useState<boolean>(activeRental ? false : true);

  useEffect(() => {
    if (!activeRental) {
      localStorage.setItem('active_rental', JSON.stringify(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRental]);

  const handleClickRental = () => {
    navigate('/dashboard/rentals');
  };

  const handleClickPlay = () => {
    navigate('/games/smashers');
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogContent sx={{ width: '563px', marginY: '50px', marginX: '28px' }}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Typography
              sx={{ fontSize: '32px', lineHeight: '38px' }}
              fontWeight={600}
            >
              Welcome back DEGEN!
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                lineHeight: '20px',
                marginTop: '24px',
                marginBottom: '30px',
              }}
              fontWeight={700}
            >
              Your active{' '}
              <Link sx={{ cursor: 'pointer' }} onClick={handleClickRental}>
                rental
              </Link>{' '}
              is at {progressValue.toFixed(2)}% of it’s earning cap. Earn more
              NFTL when you play NOW.
            </Typography>
            <Button variant="contained" onClick={handleClickPlay}>
              Play Nifty Smasher Now
            </Button>
          </Grid>
          <Grid item md={6}>
            <Box sx={{ width: '70%', display: 'inline-block', float: 'right' }}>
              <ProgressBar value={progressValue}>
                {rental.earning_cap !== rental.earning_cap_daily ? (
                  `${rental.earning_cap_daily} / ${rental.earning_cap}`
                ) : (
                  <Typography fontSize={10}>
                    LIMIT REACHED. RENEWS IN{' '}
                    <Typography
                      color={palette.warning.main}
                      variant="caption"
                      fontSize={10}
                    >
                      <Countdown
                        date={new Date(rental.next_charge_at * 1000)}
                      />
                    </Typography>
                  </Typography>
                )}
              </ProgressBar>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                marginTop: '14px',
              }}
            >
              <DegenImage
                sx={{
                  width: '174px',
                  height: 'auto',
                  marginTop: '16px',
                  borderRadius: '8px',
                }}
                tokenId={degenId}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ActiveRentalDialog;
