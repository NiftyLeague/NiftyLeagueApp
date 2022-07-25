import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import GameCard from 'components/cards/GameCard';
import useArcadeBalance from 'hooks/useArcadeBalance';
import WenThumbnail from 'assets/images/games/wen.gif';
import BuyArcadeTokensDialog from 'components/dialog/BuyArcadeTokensDialog';
import ConnectWrapper from 'components/wrapper/ConnectWrapper';

const ArcadeGameList: React.FC = () => {
  const navigate = useNavigate();
  const { arcadeBalance, refetch: refetchArcadeBal } = useArcadeBalance();
  const [openBuyAT, setOpenBuyAT] = useState(false);

  const goToPlayOnGame = useCallback(() => {
    if (Number(arcadeBalance) > 0) {
      navigate('/games/wen-game');
    } else {
      setOpenBuyAT(true);
    }
  }, [arcadeBalance, navigate]);

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
                onClick={goToPlayOnGame}
              >
                {Number(arcadeBalance) > 0
                  ? 'Play in Browser'
                  : 'Buy Arcade Tokens'}
              </Button>
            </ConnectWrapper>
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

ArcadeGameList.displayName = 'ArcadeGameList';
export default ArcadeGameList;
