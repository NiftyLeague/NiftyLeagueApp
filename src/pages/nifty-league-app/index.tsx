import { Stack, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import GameCard from 'components/cards/GameCard';
import SectionTitle from 'components/sections/SectionTitle';
import games from 'constants/games';
import degens from '../../constants/degens';
import DegenCard from '../../components/cards/DegenCard';

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
            <Stack direction="row" gap={1}>
              <IconButton size="small">
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton size="small">
                <ArrowForwardIosIcon />
              </IconButton>
            </Stack>
          </Stack>
        }
      >
        Games
      </SectionTitle>
      <Stack direction="row" flexWrap="wrap" gap={4}>
        {games.map((game) => (
          <GameCard
            key={game.title}
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
            <Stack direction="row" gap={1}>
              <IconButton size="small">
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton size="small">
                <ArrowForwardIosIcon />
              </IconButton>
            </Stack>
          </Stack>
        }
      >
        Degen Rentals
      </SectionTitle>
      <Stack direction="row" flexWrap="wrap" gap={4}>
        {degens.map((degen) => (
          <DegenCard
            key={degen.title}
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
