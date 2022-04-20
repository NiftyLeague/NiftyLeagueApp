import { Grid, Button } from '@mui/material';
import GameCard from 'components/cards/GameCard';
import games from 'constants/games';
import SectionSlider from 'components/sections/SectionSlider';

const GamesPage = () => (
  <SectionSlider
    firstSection
    isSlider={false}
    title="Games"
    actions={<Button variant="outlined">Download Desktop App</Button>}
  >
    <Grid
      container
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-between"
    >
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
    </Grid>
  </SectionSlider>
);

export default GamesPage;
