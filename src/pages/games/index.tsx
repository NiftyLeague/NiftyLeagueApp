import { Button, useTheme } from '@mui/material';
import GameCard from 'components/cards/GameCard';
import games from 'constants/games';
import SectionSlider from 'components/sections/SectionSlider';

const GamesPage = () => {
  const theme = useTheme();
  return (
    <>
      <SectionSlider
        firstSection
        title="Desktop Games"
        actions={<Button variant="outlined">Download Desktop App</Button>}
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
      <SectionSlider title="WebGL Games">
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
    </>
  );
};

export default GamesPage;
