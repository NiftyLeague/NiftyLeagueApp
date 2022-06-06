import { useContext, useEffect, useState } from 'react';
import { Box, Skeleton, CardMedia } from '@mui/material';

import DegenImage from 'components/cards/DegenCard/DegenImage';
import { GamerProfileContext } from '../index';
import ProfileImageDialog from './ProfileImageDialog';

import { Degen } from 'types/degens';
import { ProfileAvatar } from 'types/account';
import UnavailableImg from 'assets/images/unavailable-image.png';

interface ImageProfileProps {
  degens: Degen[] | undefined;
  avatar?: ProfileAvatar;
  avatarFee?: number;
}

const ImageProfile = ({
  degens,
  avatar,
  avatarFee,
}: ImageProfileProps): JSX.Element => {
  const { isLoadingDegens } = useContext(GamerProfileContext);
  const [degenSelected, setDegenSelected] = useState<string>('');

  useEffect(() => {
    if (avatar?.id) {
      setDegenSelected(avatar?.id);
      return;
    }
    if (degens) {
      setDegenSelected(degens[0]?.id);
      return;
    }
  }, [degens, avatar]);

  const handleChangeAvatar = (degenId: string) => {
    if (degenId) {
      setDegenSelected(degenId);
    }
  };

  const renderImage = () => {
    if (isLoadingDegens) {
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
        {degens && degens.length > 0 && (
          <ProfileImageDialog
            onChangeAvatar={handleChangeAvatar}
            degens={degens}
            avatarFee={avatarFee}
          />
        )}
      </Box>
    </>
  );
};

export default ImageProfile;
