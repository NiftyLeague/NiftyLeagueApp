import { Stack, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GameCard from 'components/cards/GameCard';
import SectionTitle from 'components/sections/SectionTitle';
import games from 'constants/games';
import degens from 'constants/degens';
import DegenCard from 'components/cards/DegenCard';
import PaginationIconOnly from 'components/pagination/PaginationIconOnly';

// ==============================|| SAMPLE PAGE ||============================== //

const NiftyLeagueAppPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = useTheme();

  return (
    <>
      <SectionTitle
        firstSection
        actions={
          <Stack direction="row" gap={2}>
            <Button variant="outlined">View All Games</Button>
            <PaginationIconOnly />
          </Stack>
        }
      >
        Games
      </SectionTitle>
      <Stack direction="row" flexWrap="wrap" gap={4}>
        {games.map((game) => (
          <GameCard
            key={game.image}
            title={game.title}
            onlineCounter={game.onlineCounter}
            description={game.description}
            image={game.image}
            isComingSoon={game.isComingSoon}
          />
        ))}
      </Stack>
      <SectionTitle
        actions={
          <Stack direction="row" gap={2}>
            <Button variant="outlined">View All Rentals</Button>
            <PaginationIconOnly />
          </Stack>
        }
      >
        Degen Rentals
      </SectionTitle>
      <Stack direction="row" flexWrap="wrap" gap={4}>
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
          />
        ))}
      </Stack>
    </>
  );
};

export default NiftyLeagueAppPage;
