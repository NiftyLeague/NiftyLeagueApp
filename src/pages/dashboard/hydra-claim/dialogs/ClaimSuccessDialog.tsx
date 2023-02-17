import {
  Button,
  CardMedia,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import OpenSea from 'assets/images/icons/OpenSea.png';
import { DEGEN_BASE_IMAGE_URL } from 'constants/url';
import { useContext } from 'react';
import NetworkContext from 'contexts/NetworkContext';

interface Props {
  hydraID?: number;
  onClose: () => void;
}

const ClaimSuccessDialog = ({ hydraID, onClose }: Props): JSX.Element => {
  const { targetNetwork } = useContext(NetworkContext);
  return (
    <>
      <DialogTitle sx={{ textAlign: 'center' }}>
        HYDRA #{hydraID} Claimed
      </DialogTitle>
      <DialogContent dividers sx={{ maxWidth: '820px' }}>
        {hydraID ? (
          <Stack rowGap={2} alignItems="center">
            <CardMedia
              component="img"
              image={`${DEGEN_BASE_IMAGE_URL}/${
                targetNetwork.name
              }/images/${hydraID}.${hydraID === 9924 ? 'mp4' : 'png'}`}
              alt="degen"
              sx={{ aspectRatio: '1/1', width: '320px', margin: '0 auto' }}
            />
            <Typography color="gray">
              Please wait a few minutes for your HYDRA to hatch! You can
              manually refresh metadata on OpenSea if your image is not
              immediately revealed.
            </Typography>
            <a
              href={`https://opensea.io/assets/0x986aea67c7d6a15036e18678065eb663fc5be883/${hydraID}`}
              target="_blank"
              rel="noreferrer"
            >
              <Typography color="gray" sx={{ textDecoration: 'none' }}>
                View on OpenSea <img src={OpenSea} alt="NiftyLogo" width="16" />
              </Typography>
            </a>
          </Stack>
        ) : (
          <Skeleton variant="rectangular" width={320} height={320} />
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" fullWidth onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export default ClaimSuccessDialog;
