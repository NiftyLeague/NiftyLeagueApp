import { Button, Stack } from '@mui/material';
import SectionTitle from 'components/sections/SectionTitle';
import PaginationIconOnly from 'components/pagination/PaginationIconOnly';
import GameCard from 'components/cards/GameCard';
import games from 'constants/games';

const GamesPage = () => (
  <>
    <SectionTitle firstSection actions={<PaginationIconOnly />}>
      <Stack direction="row" gap={3} alignItems="center">
        Desktop Games
        <Button variant="outlined">Download Desktop App</Button>
      </Stack>
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
    <SectionTitle actions={<PaginationIconOnly />}>WebGL Games</SectionTitle>
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
  </>
);

export default GamesPage;
