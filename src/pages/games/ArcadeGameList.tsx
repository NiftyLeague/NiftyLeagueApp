import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import { NetworkContext } from 'NetworkProvider';
import GameCard from 'components/cards/GameCard';
import WenThumbnail from 'assets/images/games/wen.png';
import useArcadeBalance from 'hooks/useArcadeBalance';

const ArcadeGameList: React.FC = () => {
  const navigate = useNavigate();
  const { web3Modal } = useContext(NetworkContext);
  const { arcadeBalance } = useArcadeBalance();

  const goToPlayOnGame = useCallback(() => {
    if (Number(arcadeBalance) > 0) {
      navigate('/games/play-on-game/wen-game');
    } else {
      // TODO: Show Buy Arcade Token Modal being developed by @Diego
    }
  }, [arcadeBalance, navigate]);

  return (
    <>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="Wen Game"
          required="Arcade Tokens Required"
          description="Play this single-player baseball inspired arcade game and rank as high as you can!"
          image={WenThumbnail}
          actions={
            <>
              {web3Modal.cachedProvider ? (
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ minWidth: 80, flex: 1 }}
                  onClick={goToPlayOnGame}
                >
                  Play in Browser
                </Button>
              ) : (
                <Button variant="contained" fullWidth disabled color="inherit">
                  Connect wallet to play
                </Button>
              )}
            </>
          }
        />
      </Grid>
    </>
  );
};

ArcadeGameList.displayName = 'ArcadeGameList';
export default ArcadeGameList;
