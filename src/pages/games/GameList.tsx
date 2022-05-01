import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GameCard from 'components/cards/GameCard';
import NiftySmashers from 'assets/images/games/nifty-smashers.gif';
import NiftyTennis from 'assets/images/games/nifty-tennis.jpeg';
import { Dialog, DialogTrigger, DialogContent } from 'components/dialog';
import Downloader from './Downloader';

const GameList = () => {
  const navigate = useNavigate();

  const goToPlayOnGame = () => {
    navigate('/games/play-on-game');
  };

  return (
    <>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="Nifty Smashers"
          description="The first NFT brawler on the Ethereum blockchain!"
          image={NiftySmashers}
          onlineCounter={200}
          actions={
            <>
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ minWidth: 80, flex: 1 }}
                  >
                    Play on Desktop
                  </Button>
                </DialogTrigger>
                <DialogContent
                  aria-labelledby="customized-dialog-title"
                  dialogTitle="Nifty League Desktop"
                >
                  <Downloader />
                </DialogContent>
              </Dialog>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ minWidth: 80, flex: 1 }}
                onClick={goToPlayOnGame}
              >
                Play on Web
              </Button>
            </>
          }
        />
      </Grid>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="Nifty Tennis"
          description="The first ever NFT tennis game on the Ethereum blockchain"
          isComingSoon
          image={NiftyTennis}
        />
      </Grid>
    </>
  );
};

export default GameList;
