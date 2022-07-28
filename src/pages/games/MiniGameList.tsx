import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import useArcadeBalance from 'hooks/useArcadeBalance';
import BuyArcadeTokensDialog from 'components/dialog/BuyArcadeTokensDialog';
import ConnectWrapper from 'components/wrapper/ConnectWrapper';
import GameCard from 'components/cards/GameCard';
import WenThumbnail from 'assets/images/games/wen.gif';
import MtRugmanThumbnail from 'assets/images/games/mt-rugman.gif';

const MiniGameList: React.FC = () => {
  const navigate = useNavigate();
  const { arcadeBalance, refetch: refetchArcadeBal } = useArcadeBalance();
  const [openBuyAT, setOpenBuyAT] = useState(false);

  const goToPlayWENGame = useCallback(() => {
    if (Number(arcadeBalance) > 0) {
      navigate('/games/wen-game');
    } else {
      setOpenBuyAT(true);
    }
  }, [arcadeBalance, navigate]);

  const goToPlayMtRugman = useCallback(() => {
    navigate('/games/mt-rugman');
  }, [navigate]);

  return (
    <>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="WEN Game"
          required="Arcade Tokens Required"
          description="Play this single-player baseball inspired arcade game and rank as high as you can!"
          image={WenThumbnail}
          actions={
            <ConnectWrapper
              color="primary"
              fullWidth
              buttonText="Connect Wallet to play"
            >
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ minWidth: 80, flex: 1 }}
                onClick={goToPlayWENGame}
              >
                {Number(arcadeBalance) > 0
                  ? 'Play in Browser'
                  : 'Buy Arcade Tokens'}
              </Button>
            </ConnectWrapper>
          }
        />
      </Grid>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="Mt. Rugman"
          required=" "
          description="Burn NFTL tokens in the fires of Mount Rugman"
          image={MtRugmanThumbnail}
          actions={
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ minWidth: 80, flex: 1 }}
              onClick={goToPlayMtRugman}
            >
              Burn Now
            </Button>
          }
        />
      </Grid>
      <BuyArcadeTokensDialog
        open={openBuyAT}
        onSuccess={() => {
          setOpenBuyAT(false);
          refetchArcadeBal();
        }}
        onClose={() => setOpenBuyAT(false)}
      />
    </>
  );
};

MiniGameList.displayName = 'MiniGameList';
export default MiniGameList;
