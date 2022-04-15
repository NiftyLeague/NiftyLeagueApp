import { Grid, Stack } from '@mui/material';
import PaginationIconOnly from 'components/pagination/PaginationIconOnly';
import { PropsWithChildren, ReactNode, useRef } from 'react';
import Slider from 'react-slick';
import { sectionSpacing } from 'store/constant';
import SectionTitle from './SectionTitle';

interface Props {
  title: string;
  firstSection?: boolean;
  actions?: ReactNode;
  sliderSettingsOverride?: Partial<Slider>;
}

const SectionSlider = ({
  title,
  firstSection,
  children,
  actions,
  sliderSettingsOverride,
}: PropsWithChildren<Props>): JSX.Element => {
  const refSlider = useRef<Slider>(null);
  const settings = {
    dots: false,
    swipeToSlide: false,
    focusOnSelect: true,
    arrows: false,
    centerPadding: '0',
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280,
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
    ...sliderSettingsOverride,
  } as Partial<Slider>;

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
          firstSection={firstSection}
          actions={
            <Stack direction="row" gap={2}>
              {actions}
              <PaginationIconOnly
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
              />
            </Stack>
          }
        >
          {title}
        </SectionTitle>
      </Grid>
      <Grid item xs={12}>
        <Slider {...settings} ref={refSlider}>
          {children}
        </Slider>
      </Grid>
    </Grid>
  );
};

export default SectionSlider;
