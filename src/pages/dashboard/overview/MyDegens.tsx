import { Box, Button, Grid, Stack } from '@mui/material';
import DegenCard from 'components/cards/DegenCard';
import PaginationIconOnly from 'components/pagination/PaginationIconOnly';
import SectionTitle from 'components/sections/SectionTitle';
import degens from 'constants/degens';
import { useRef } from 'react';
import Slider from 'react-slick';
import { sectionSpacing } from 'store/constant';

interface MyDegensProps {
  onViewAllDegens?: React.MouseEventHandler<HTMLButtonElement>;
}

const BoxDegenStyles = {
  px: '10px',
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

const MyDegens = ({ onViewAllDegens }: MyDegensProps): JSX.Element => {
  const refSlider = useRef<Slider>(null);
  const settings = {
    dots: false,
    centerMode: true,
    swipeToSlide: false,
    focusOnSelect: true,
    arrows: false,
    centerPadding: '0',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
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
              <Button variant="outlined" onClick={onViewAllDegens}>
                View All Degens
              </Button>
              <PaginationIconOnly
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </Stack>
          }
        >
          My Degens
        </SectionTitle>
      </Grid>
      <Grid item xs={12}>
        <Slider {...settings} ref={refSlider}>
          {degens.map((degen) => (
            <Box sx={BoxDegenStyles}>
              <DegenCard key={degen.title} {...degen} />
            </Box>
          ))}
        </Slider>
      </Grid>
    </Grid>
  );
};

export default MyDegens;
