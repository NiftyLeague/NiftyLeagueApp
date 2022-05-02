import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ComicCard from 'components/cards/ComicCard';
import SectionSlider from 'components/sections/SectionSlider';
import { Comic } from 'types/comic';
import ViewComicDialog from 'components/dialog/ViewComicDialog';
import useComicsBalance from 'hooks/useComicsBalance';

const BoxComicStyles = {
  px: 1,
  '& .MuiPaper-root': {
    maxWidth: 345,
    height: 'auto',
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
  },
};
const MyComics = (): JSX.Element => {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const navigate = useNavigate();
  const comicsBalance = useComicsBalance();
  console.log(
    'comicsBalance filtered',
    comicsBalance.filter((comic) => comic.balance && comic.balance > 0),
  );

  const handleViewComic = (comic: Comic) => {
    setSelectedComic(comic);
  };

  const handleCloseDialog = () => {
    setSelectedComic(null);
  };

  const settings = {
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
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
        {comicsBalance
          .filter((comic) => comic.balance && comic.balance > 0)
          .map((comic) => (
            <Box sx={BoxComicStyles} key={comic.wearableName}>
              <ComicCard
                comic={comic}
                onViewComic={() => handleViewComic(comic)}
              />
            </Box>
          ))}
        {comicsBalance.map((comic) => (
          <Box sx={BoxComicStyles} key={comic.wearableName}>
            <ComicCard
              comic={comic}
              onViewComic={() => handleViewComic(comic)}
            />
          </Box>
        ))}
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
