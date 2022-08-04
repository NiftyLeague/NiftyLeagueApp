import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import useArcadeBalance from 'hooks/useArcadeBalance';
import BuyArcadeTokensDialog from 'components/dialog/BuyArcadeTokensDialog';
import ConnectWrapper from 'components/wrapper/ConnectWrapper';
import GameCard from 'components/cards/GameCard';
import WenThumbnail from 'assets/images/games/wen.gif';
import MtGawxThumbnail from 'assets/images/games/mt-gawx.gif';

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

  const goToPlayMtGawx = useCallback(() => {
    navigate('/games/mt-gawx');
  }, [navigate]);

  return (
    <>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="WEN Game"
          required="Arcade Tokens Required"
          description="Play this single-player baseball inspired arcade game and rank as high as you can!"
          image={WenThumbnail}
          autoHeight={true}
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
          title="Mt. Gawx"
          required=" "
          description={`Hearing the DEGENs' desperate pleas to spend their hard-earned NFTL and with bigger sinks still under his development, Satoshi suggests the DEGENs climb to the top of the MT. GAWX volcano to offer their NFTL sacrifices to the fiery depths to see who might burn the most, and to discover whether the rumors of Rugman offering interesting rewards to burners are true.\n\nStrange thing is, every time they lob in NFTL, it's almost as if the volcano's… responding.\n\nCould the fabled 7th tribe be waking up from their centuries-long slumber, deep in the caves where Rugman resides?`}
          showMore={true}
          image={MtGawxThumbnail}
          autoHeight={true}
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
                onClick={goToPlayMtGawx}
              >
                Burn Now
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

MiniGameList.displayName = 'MiniGameList';
export default MiniGameList;
