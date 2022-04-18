import { Button, useTheme } from '@mui/material';
import GameCard from 'components/cards/GameCard';
import games from 'constants/games';
import degens from 'constants/degens';
import DegenCard from 'components/cards/DegenCard';
import SectionSlider from 'components/sections/SectionSlider';

// ==============================|| SAMPLE PAGE ||============================== //

const NiftyLeagueAppPage = () => {
  const theme = useTheme();

  return (
    <>
      <SectionSlider
        firstSection
        title="Games"
        actions={<Button variant="outlined">View All Games</Button>}
      >
        {games.map((game) => (
          <GameCard
            key={game.image}
            title={game.title}
            onlineCounter={game.onlineCounter}
            description={game.description}
            image={game.image}
            isComingSoon={game.isComingSoon}
            // Setting minHeight so carousel doesn't look weird with varying height cards
            sx={{ marginRight: theme.spacing(4), minHeight: 478 }}
          />
        ))}
      </SectionSlider>
      <SectionSlider
        title="Degen Rentals"
        actions={<Button variant="outlined">View All Rentals</Button>}
      >
        {degens.map((degen) => (
          <DegenCard
            key={degen.image}
            id={degen.id}
            title={degen.title}
            multiplier={degen.multiplier}
            activeRentals={degen.activeRentals}
            price={degen.price}
            ownerId={degen.ownerId}
            image={degen.image}
            sx={{ marginRight: theme.spacing(4) }}
          />
        ))}
      </SectionSlider>
    </>
  );
};

export default NiftyLeagueAppPage;
