/* eslint-disable no-nested-ternary */
import { useMemo, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ComicCard from 'components/cards/ComicCard';
import SectionSlider from 'components/sections/SectionSlider';
import { Comic } from 'types/comic';
import EmptyState from 'components/EmptyState';
import ViewComicDialog from 'components/dialog/ViewComicDialog';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import useComicsBalance from 'hooks/useComicsBalance';
import { v4 as uuidv4 } from 'uuid';

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
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
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
          [...Array(6)].map(() => (
            <Grid item xs={12} sm={11} md={11} lg={11} xl={11} key={uuidv4()}>
              <SkeletonDegenPlaceholder />
            </Grid>
          ))
        ) : filteredComics.length ? (
          filteredComics.map((comic) => (
            <Box
              sx={{
                px: 1,
                '& .MuiPaper-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                },
                '& .MuiCardContent-root': {
                  p: '12px',
                },
                '& .MuiTypography-h3': {
                  fontSize: '16px',
                },
                '& .MuiCardActions-root': {
                  p: '12px',
                  pt: 0,
                },
              }}
              key={comic.wearableName}
            >
              <ComicCard
                comic={comic}
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
