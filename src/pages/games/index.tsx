import { Grid, Button } from '@mui/material';
import GameCard from 'components/cards/GameCard';
import games from 'constants/games';
import SectionSlider from 'components/sections/SectionSlider';
import { cardSpacing } from 'store/constant';

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
      spacing={cardSpacing}
    >
      {games.map((game) => (
        <Grid key={game.title} item sm={12} md={6} lg={4} xl={3}>
          <GameCard {...game} />
        </Grid>
      ))}
    </Grid>
  </SectionSlider>
);

export default GamesPage;
