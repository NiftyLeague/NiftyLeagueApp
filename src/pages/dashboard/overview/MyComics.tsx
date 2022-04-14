import { Box, Button, Grid, Stack } from '@mui/material';
import ComicCard from 'components/cards/ComicCard';
import PaginationIconOnly from 'components/pagination/PaginationIconOnly';
import SectionTitle from 'components/sections/SectionTitle';
import comics from 'constants/comics';
import { useRef } from 'react';
import Slider from 'react-slick';
import { sectionSpacing } from 'store/constant';

interface MyComicsProps {
  onViewAllComics?: React.MouseEventHandler<HTMLButtonElement>;
}

const BoxComicStyles = {
  px: '10px',
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
  const refSlider = useRef<Slider>(null);
  const settings = {
    dots: false,
    centerMode: true,
    swipeToSlide: false,
    focusOnSelect: true,
    arrows: false,
    centerPadding: '0',
    slidesToShow: 2,
    slidesToScroll: 1,
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

  const onClickNext = () => {
    refSlider?.current?.slickNext();
  };

  const onClickPrev = () => {
    refSlider?.current?.slickPrev();
  };

  return (
    <Grid container spacing={sectionSpacing}>
      <Grid item xs={12}>
        <SectionTitle
          firstSection
          actions={
            <Stack direction="row" gap={2}>
              <Button variant="outlined" onClick={onViewAllComics}>
                View All Comics
              </Button>
              <PaginationIconOnly
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </Stack>
          }
        >
          My Comics
        </SectionTitle>
      </Grid>
      <Grid item xs={12}>
        <Slider {...settings} ref={refSlider}>
          {comics.map((comic) => (
            <Box sx={BoxComicStyles}>
              <ComicCard key={comic.title} {...comic} />
            </Box>
          ))}
        </Slider>
      </Grid>
    </Grid>
  );
};

export default MyComics;
