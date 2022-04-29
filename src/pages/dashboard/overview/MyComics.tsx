import { Box, Button } from '@mui/material';
import ComicCard from 'components/cards/ComicCard';
import comics from 'constants/comics';
import SectionSlider from 'components/sections/SectionSlider';
import { useState } from 'react';
import { Comic } from 'types/comic';
import ViewComicDialog from 'components/dialog/ViewComicDialog';

interface MyComicsProps {
  onViewAllComics?: React.MouseEventHandler<HTMLButtonElement>;
}

const BoxComicStyles = {
  px: 1,
  '& .MuiPaper-root': {
    maxWidth: 345,
    height: 356,
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
const MyComics = ({ onViewAllComics }: MyComicsProps): JSX.Element => {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);

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
          <Button variant="outlined" onClick={onViewAllComics}>
            View All Comics
          </Button>
        }
      >
        {comics.map((comic) => (
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
