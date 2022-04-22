import { Button, Box } from '@mui/material';
import GameCard from 'components/cards/GameCard';
import games from 'constants/games';
import degens from 'constants/degens';
import DegenCard from 'components/cards/DegenCard';
import SectionSlider from 'components/sections/SectionSlider';

const NiftyLeagueAppPage = () => (
  <>
    <SectionSlider
      firstSection
      title="Games"
      actions={<Button variant="outlined">View All Games</Button>}
    >
      {games.map((game) => (
        <Box paddingRight={2}>
          <GameCard key={game.image} {...game} sx={{ minHeight: 478 }} />
        </Box>
      ))}
    </SectionSlider>
    <SectionSlider
      title="Degen Rentals"
      actions={<Button variant="outlined">View All Rentals</Button>}
    >
      {degens.map((degen) => (
        <Box paddingRight={2}>
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
  </>
);

export default NiftyLeagueAppPage;
