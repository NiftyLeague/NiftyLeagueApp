import { memo, useContext } from 'react';
import { CardMedia, SxProps } from '@mui/material';
import NetworkContext from '@/contexts/NetworkContext';
import { DEGEN_BASE_IMAGE_URL } from '@/constants/url';
import { LEGGIES } from '@/constants/degens';
const IMAGE_HEIGHT = 320;

const DegenImage = memo(
  ({ tokenId, sx }: { tokenId: string | number; sx?: SxProps<{}> }) => {
    const { targetNetwork } = useContext(NetworkContext);
    const imageURL = `${DEGEN_BASE_IMAGE_URL}/${targetNetwork.name}/images/${tokenId}`;
    // @ts-ignore
    const imageHeight = sx?.height ?? IMAGE_HEIGHT;
    let setting: any = {
      height: imageHeight,
      component: 'img',
      image: `${imageURL}.png`,
    };

    if (LEGGIES.includes(Number(tokenId))) {
      setting = {
        ...setting,
        component: 'video',
        image: `${imageURL}.mp4`,
        autoPlay: true,
        loop: true,
        muted: true,
      };
    }

    const handleImageError = (e) => {
      e.target.onerror = null;
      e.target.src = '/images/unavailable-image.png';
    };

    return (
      <CardMedia
        sx={{ objectFit: 'cover', ...sx }}
        {...setting}
        onError={handleImageError}
      />
    );
  },
);

DegenImage.displayName = 'DegenImage';
export default DegenImage;
