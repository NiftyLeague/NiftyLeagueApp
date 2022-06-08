import { memo } from 'react';
import { CardMedia } from '@mui/material';
import useBackgroundType from 'hooks/useBackgroundType';
import ImagePlaceholder from 'components/cards/Skeleton/ImagePlaceholder';
import UnavailableImg from 'assets/images/unavailable-image.png';
import { DEGEN_BASE_IMAGE_URL } from 'constants/url';
import { SxProps } from '@mui/material';
const IMAGE_HEIGHT = 320;

const DegenImage = memo(
  ({ tokenId, sx }: { tokenId: string | number; sx?: SxProps<{}> }) => {
    const { loading, error, background } = useBackgroundType(tokenId);
    const imageURL = `${DEGEN_BASE_IMAGE_URL}/mainnet/images/${tokenId}`;
    let setting: any = {
      height: IMAGE_HEIGHT,
      component: 'img',
      image: `${imageURL}.png`,
    };

    if (error) setting = { ...setting, image: UnavailableImg };

    if (loading) {
      return (
        <ImagePlaceholder
          sx={{
            overflow: 'hidden',
            height: IMAGE_HEIGHT,
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

    return <CardMedia sx={{ ...sx }} {...setting} />;
  },
);

export default DegenImage;
