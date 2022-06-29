import { memo } from 'react';
import { CardMedia, SxProps } from '@mui/material';
import useBackgroundType from 'hooks/useBackgroundType';
import ImagePlaceholder from 'components/cards/Skeleton/ImagePlaceholder';
import UnavailableImg from 'assets/images/unavailable-image.png';
import { DEGEN_BASE_IMAGE_URL } from 'constants/url';

const IMAGE_HEIGHT = 294;

const DegenImage = memo(
  ({
    tokenId,
    imageHeight = IMAGE_HEIGHT,
    sx,
  }: {
    tokenId: string | number;
    imageHeight?: number;
    sx?: SxProps<{}>;
  }) => {
    const { loading, error, background } = useBackgroundType(tokenId);
    const imageURL = `${DEGEN_BASE_IMAGE_URL}/mainnet/images/${tokenId}`;
    let setting: any = {
      height: imageHeight,
      component: 'img',
      image: `${imageURL}.png`,
      sx: {
        borderRadius: '4px',
      },
    };

    if (error) setting = { ...setting, image: UnavailableImg };

    if (loading) {
      return (
        <ImagePlaceholder
          sx={{
            overflow: 'hidden',
            height: imageHeight,
          }}
        />
      );
    }

    if (background === 'Legendary') {
      setting = {
        ...setting,
        component: 'video',
        image: `${imageURL}.mp4`,
        autoPlay: true,
        loop: true,
        muted: true,
      };
    }

    return (
      <CardMedia
        {...setting}
        sx={{ borderRadius: '4px', objectFit: 'cover', ...sx }}
      />
    );
  },
);

export default DegenImage;
