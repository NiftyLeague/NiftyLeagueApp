import { CardMedia } from '@mui/material';
import useBackgroundType from 'hooks/useBackgroundType';
import ImagePlaceholder from 'components/cards/Skeleton/ImagePlaceholder';
import UnavailableImg from 'assets/images/unavailable-image.png';
import { DEGEN_BASE_IMAGE_URL } from 'constants/url';

const IMAGE_HEIGH = 320;

const DegenImage = ({
  network,
  tokenId,
}: {
  network?: string;
  tokenId: string | number;
}) => {
  const [loading, error, background] = useBackgroundType(tokenId);
  const imageURL = `${DEGEN_BASE_IMAGE_URL}/${network}/images/${tokenId}`;
  let setting: any = {
    height: IMAGE_HEIGH,
    component: 'img',
    image: `${imageURL}.png`,
  };

  if (error) {
    setting = { ...setting, image: UnavailableImg };
  }

  if (loading) {
    return (
      <ImagePlaceholder
        sx={{
          overflow: 'hidden',
          height: IMAGE_HEIGH,
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

  return <CardMedia {...setting} />;
};
DegenImage.defaultProps = { network: 'mainnet' };

export default DegenImage;