import { memo, useContext } from 'react';
import { CardMedia, SxProps } from '@mui/material';
import useBackgroundType from 'hooks/useBackgroundType';
import ImagePlaceholder from 'components/cards/Skeleton/ImagePlaceholder';
import UnavailableImg from 'assets/images/unavailable-image.png';
import { DEGEN_BASE_IMAGE_URL } from 'constants/url';
import NetworkContext from 'contexts/NetworkContext';
const IMAGE_HEIGHT = 320;

const DegenImage = memo(
  ({ tokenId, sx }: { tokenId: string | number; sx?: SxProps<{}> }) => {
    const { targetNetwork } = useContext(NetworkContext);
    const { loading, error, background } = useBackgroundType(tokenId);
    const imageURL = `${DEGEN_BASE_IMAGE_URL}/${targetNetwork.name}/images/${tokenId}`;
    // @ts-ignore
    const imageHeight = sx?.height ?? IMAGE_HEIGHT;
    let setting: any = {
      height: imageHeight,
      component: 'img',
      image: `${imageURL}.png`,
    };

    if (error) setting = { ...setting, image: UnavailableImg };

    if (loading) {
      return (
        <ImagePlaceholder
          sx={{
            overflow: 'hidden',
            height: imageHeight,
            // @ts-ignore
            width: sx?.width,
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

    return <CardMedia sx={{ objectFit: 'cover', ...sx }} {...setting} />;
  },
);

export default DegenImage;
