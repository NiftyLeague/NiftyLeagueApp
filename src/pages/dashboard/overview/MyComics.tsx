/* eslint-disable no-nested-ternary */
import { useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ComicCard from 'components/cards/ComicCard';
import SectionSlider from 'components/sections/SectionSlider';
import { Comic } from 'types/comic';
import EmptyState from 'components/EmptyState';
import ViewComicDialog from 'components/dialog/ViewComicDialog';
import useComicsBalance from 'hooks/useComicsBalance';
import ComicPlaceholder from 'components/cards/Skeleton/ComicPlaceholder';

const MyComics = (): JSX.Element => {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const navigate = useNavigate();
  const { comicsBalance, loading } = useComicsBalance();
  const filteredComics = useMemo(
    () => comicsBalance.filter((comic) => comic.balance && comic.balance > 0),
    [comicsBalance],
  );

  const handleViewComic = (comic: Comic) => {
    setSelectedComic(comic);
  };

  const handleCloseDialog = () => {
    setSelectedComic(null);
  };

  const handleBuyComics = () => {
    window.open(
      'https://opensea.io/collection/nifty-league-launch-comics',
      '_blank',
    );
  };

  const settings = {
    slidesToShow: 3,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <SectionSlider
        firstSection
        title="My Comics"
        sliderSettingsOverride={settings}
        actions={
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard/comics')}
          >
            View All Comics
          </Button>
        }
      >
        {loading ? (
          [...Array(2)].map(() => (
            <Box
              sx={{
                px: 1,
              }}
            >
              <ComicPlaceholder imageWidth={158} imageHeight="100%" />
            </Box>
          ))
        ) : filteredComics.length ? (
          filteredComics.map((comic) => (
            <Box
              sx={{
                px: 1,
              }}
              key={comic.wearableName}
            >
              <ComicCard
                data={comic}
                onViewComic={() => handleViewComic(comic)}
              />
            </Box>
          ))
        ) : (
          <EmptyState
            message="No Comics found. Please check your address or go purchase some if you have not done so already!"
            buttonText="Buy Comics"
            onClick={handleBuyComics}
          />
        )}
      </SectionSlider>
      <ViewComicDialog
        comic={selectedComic}
        open={Boolean(selectedComic)}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default MyComics;
