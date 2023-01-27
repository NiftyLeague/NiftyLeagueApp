/* eslint-disable no-nested-ternary */
import { useMemo, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ComicCard from 'components/cards/ComicCard';
import SectionSlider from 'components/sections/SectionSlider';
import { Comic } from 'types/comic';
import EmptyState from 'components/EmptyState';
import ViewComicDialog from 'components/dialog/ViewComicDialog';
import useComicsBalance from 'hooks/useComicsBalance';
import ComicPlaceholder from 'components/cards/Skeleton/ComicPlaceholder';
import { COMICS_OPENSEA_URL } from 'constants/url';

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
    window.open(COMICS_OPENSEA_URL, '_blank');
  };

  const settings = {
    slidesToShow: 4,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <>
      <SectionSlider
        isSlider={filteredComics.length > 0}
        firstSection
        title="My Comics"
        sliderSettingsOverride={settings}
        actions={
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard/items')}
          >
            View All Comics
          </Button>
        }
      >
        {loading ? (
          <Box px={1}>
            <ComicPlaceholder />
          </Box>
        ) : filteredComics.length ? (
          filteredComics.map((comic) => (
            <Box px={1} key={comic.wearableName}>
              <ComicCard
                data={comic}
                onViewComic={() => handleViewComic(comic)}
              />
            </Box>
          ))
        ) : (
          <Stack justifyContent="center" alignItems="center">
            <EmptyState
              message="No Comics found. Please check your address or go purchase some if you have not done so already!"
              buttonText="Buy Comics"
              onClick={handleBuyComics}
            />
          </Stack>
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
