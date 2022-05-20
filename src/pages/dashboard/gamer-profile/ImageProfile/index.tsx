import { useContext } from 'react';
import { Box, Skeleton, CardMedia } from '@mui/material';

import DegenImage from 'components/cards/DegenCard/DegenImage';

import { Rentals } from 'types/rentals';
import { GamerProfileContext } from '../index';
import ProfileImageDialog from './ProfileImageDialog';
import UnavailableImg from 'assets/images/unavailable-image.png';

interface ImageProfileProps {
  rentals: Rentals[] | undefined;
}

const ImageProfile = ({ rentals }: ImageProfileProps): JSX.Element => {
  const { isLoadingRentals } = useContext(GamerProfileContext);
  const rental = rentals && rentals[0];

  const renderImage = () => {
    if (isLoadingRentals) {
      return <Skeleton variant="rectangular" width="100%" height="320px" />;
    } else {
      if (!rental?.degen_id) {
        return (
          <CardMedia
            component="img"
            height="auto"
            image={UnavailableImg}
            alt="no avatar"
          />
        );
      }
      return <DegenImage tokenId={rental?.degen_id} />;
    }
  };

  return (
    <>
      <Box
        sx={{
          '& img': {
            borderRadius: '8px',
          },
        }}
        position="relative"
      >
        {renderImage()}
        {rentals && rentals.length > 0 && (
          <ProfileImageDialog rentals={rentals} />
        )}
      </Box>
    </>
  );
};

export default ImageProfile;
