import { Box, Button } from '@mui/material';
import DegenCard from 'components/cards/DegenCard';
import degens from 'constants/degens';
import SectionSlider from 'components/sections/SectionSlider';

interface MyDegensProps {
  onViewAllDegens?: React.MouseEventHandler<HTMLButtonElement>;
}

const BoxDegenStyles = {
  px: 1,
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
  const settings = {
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1500,
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
    <SectionSlider
      firstSection
      title="My Degens"
      sliderSettingsOverride={settings}
      actions={
        <Button variant="outlined" onClick={onViewAllDegens}>
          View All Degens
        </Button>
      }
    >
      {degens.map((degen) => (
        <Box sx={BoxDegenStyles}>
          <DegenCard
            key={degen.id}
            id={degen.id}
            name={degen.name}
            multiplier={degen.multiplier}
            owner={degen.owner}
            price={degen.price}
            background={degen.background}
            activeRentals={degen.rental_count}
          />
        </Box>
      ))}
    </SectionSlider>
  );
};

export default MyDegens;
