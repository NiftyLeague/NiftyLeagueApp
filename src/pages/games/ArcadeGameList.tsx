import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import { NetworkContext } from 'NetworkProvider';
import GameCard from 'components/cards/GameCard';
import useArcadeBalance from 'hooks/useArcadeBalance';
import { sendEvent } from 'utils/google-analytics';
import WenThumbnail from 'assets/images/games/wen.gif';
import BuyArcadeTokensDialog from 'components/dialog/BuyArcadeTokensDialog';

const ArcadeGameList: React.FC = () => {
  const navigate = useNavigate();
  const { loadWeb3Modal, web3Modal } = useContext(NetworkContext);
  const { arcadeBalance } = useArcadeBalance();
  const [openBuyAT, setOpenBuyAT] = useState(false);

  const goToPlayOnGame = useCallback(() => {
    if (Number(arcadeBalance) > 0) {
      navigate('/games/wen-game');
    } else {
      setOpenBuyAT(true);
    }
  }, [arcadeBalance, navigate]);

  const handleConnectWallet = useCallback(() => {
    sendEvent('login', 'engagement', 'method');
    loadWeb3Modal();
  }, [loadWeb3Modal]);

  return (
    <>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="WEN Game"
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
                  {Number(arcadeBalance) > 0
                    ? 'Play in Browser'
                    : 'Buy Arcade Tokens'}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleConnectWallet}
                >
                  Connect wallet to play
                </Button>
              )}
            </>
          }
        />
      </Grid>
      <BuyArcadeTokensDialog
        open={openBuyAT}
        onClose={() => setOpenBuyAT(false)}
      />
    </>
  );
};

ArcadeGameList.displayName = 'ArcadeGameList';
export default ArcadeGameList;
