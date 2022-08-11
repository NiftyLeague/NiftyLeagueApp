import React from 'react';
import { Box, Typography } from '@mui/material';
import useComicDimension from 'hooks/useComicDimension';
import { ReactComponent as BuyComicIcon } from 'assets/images/comics/shopping-cart.svg';

export interface BuyComicCardProps {
  isNew: boolean;
  onBuyComic: () => void;
}

const BuyComicCard: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<BuyComicCardProps>>
> = ({ isNew, onBuyComic }) => {
  const { width: comicCardWidth, height: comicCardHeight } =
    useComicDimension();

  const handleBuyComic = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onBuyComic();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="1px solid #363636"
      borderRadius="5px"
      width={comicCardWidth}
      height={comicCardHeight}
      onClick={handleBuyComic}
      sx={{ cursor: 'pointer' }}
    >
      <BuyComicIcon width={comicCardWidth - 50} height={comicCardHeight - 50} />
      <Typography mt={0.5} color="#5820D6" sx={{ textDecoration: 'underline' }}>
        {isNew ? 'Buy Comic' : 'Buy More'}
      </Typography>
    </Box>
  );
};

export default BuyComicCard;
