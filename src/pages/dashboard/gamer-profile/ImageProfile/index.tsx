import { useContext, useEffect, useState } from 'react';
import { Box, Skeleton, CardMedia } from '@mui/material';

import DegenImage from 'components/cards/DegenCard/DegenImage';
import { GamerProfileContext } from '../index';
import ProfileImageDialog from './ProfileImageDialog';

import { Rentals } from 'types/rentals';
import UnavailableImg from 'assets/images/unavailable-image.png';

interface ImageProfileProps {
  rentals: Rentals[] | undefined;
}

const ImageProfile = ({ rentals }: ImageProfileProps): JSX.Element => {
  const { isLoadingRentals } = useContext(GamerProfileContext);
  const [degenSelected, setDegenSelected] = useState<string>('');

  useEffect(() => {
    if (rentals) {
      setDegenSelected(rentals[0]?.degen?.id);
    }
  }, [rentals]);

  const handleChangeAvatar = (degenId: string) => {
    if (degenId) {
      setDegenSelected(degenId);
    }
  };

  const renderImage = () => {
    if (isLoadingRentals) {
      return <Skeleton variant="rectangular" width="100%" height="320px" />;
    } else {
      if (!degenSelected) {
        return (
          <CardMedia
            component="img"
            height="auto"
            image={UnavailableImg}
            alt="no avatar"
          />
        );
      }
      return <DegenImage tokenId={degenSelected} />;
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
          <ProfileImageDialog
            onChangeAvatar={handleChangeAvatar}
            rentals={rentals}
          />
        )}
      </Box>
    </>
  );
};

export default ImageProfile;
