import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Grid, Button, CircularProgress } from '@mui/material';
import GameCard from 'components/cards/GameCard';
import SectionSlider from 'components/sections/SectionSlider';
import { cardSpacing } from 'store/constant';
import Unity, { UnityContext } from 'react-unity-webgl';
import { NetworkContext } from 'NetworkProvider';
import withVerification from 'components/Authentication';
import { NETWORK_NAME } from 'constants/networks';
import NiftySmashers from 'assets/images/gifs/nifty-smashers.gif';
import { Dialog, DialogTrigger, DialogContent } from 'components/dialog';
import Downloader from './Downloader';

const baseUrl = process.env.REACT_APP_UNITY_SMASHERS_BASE_URL as string;
const buildVersion = process.env
  .REACT_APP_UNITY_SMASHERS_BASE_VERSION as string;

const smashersContext = new UnityContext({
  loaderUrl: `${baseUrl}/Build/${buildVersion}.loader.js`,
  dataUrl: `${baseUrl}/Build/${buildVersion}.data.br`,
  frameworkUrl: `${baseUrl}/Build/${buildVersion}.framework.js.br`,
  codeUrl: `${baseUrl}/Build/${buildVersion}.wasm.br`,
  streamingAssetsUrl: `${baseUrl}/StreamingAssets`,
  companyName: 'NiftyLeague',
  productName: 'NiftySmashers',
  productVersion: buildVersion,
});

const Game = ({
  auth,
  unityContext,
}: {
  auth: string;
  unityContext: UnityContext;
}) => {
  const { address, targetNetwork } = useContext(NetworkContext);
  const favs = window.localStorage.getItem('FAV_DEGENS') || '';
  const authMsg = `true,${address || '0x0'},Vitalik,${auth},${favs}`;
  const authCallback = useRef<null | ((authMsg: string) => void)>();
  const [isLoaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (address.length && authCallback.current) {
      authCallback.current(authMsg);
    }
  }, [address, authMsg]);

  const startAuthentication = useCallback(
    (e: CustomEvent<{ callback: (auth: string) => void }>) => {
      // eslint-disable-next-line no-console
      if (DEBUG) console.log('Authenticating:', authMsg);
      e.detail.callback(authMsg);
      authCallback.current = e.detail.callback;
    },
    [authMsg],
  );

  const getConfiguration = useCallback(
    (e: CustomEvent<{ callback: (network: string) => void }>) => {
      const networkName = NETWORK_NAME[targetNetwork.chainId];
      const version = process.env.REACT_APP_SUBGRAPH_VERSION;
      // eslint-disable-next-line no-console
      if (DEBUG) console.log(`${networkName},${version ?? ''}`);
      setTimeout(
        () => e.detail.callback(`${networkName},${version ?? ''}`),
        1000,
      );
    },
    [targetNetwork.chainId],
  );

  const onMouse = useCallback(() => {
    const content = Array.from(
      document.getElementsByClassName(
        'game-canvas',
      ) as HTMLCollectionOf<HTMLElement>,
    )[0];
    if (content) {
      content.style['pointer-events' as any] = 'auto';
      content.style.cursor = 'pointer';
    }
  }, []);

  useEffect(() => {
    if (unityContext) {
      (window as any).unityInstance = unityContext;
      (window as any).unityInstance.SendMessage = unityContext.send;
      unityContext.on('loaded', () => setLoaded(true));
      unityContext.on('error', console.error);
      unityContext.on('progress', (p) => setProgress(p * 100));
      (window as any).addEventListener(
        'StartAuthentication',
        startAuthentication,
      );
      (window as any).addEventListener('GetConfiguration', getConfiguration);
      document.addEventListener('mousemove', onMouse, false);
    }
    return () => {
      if ((window as any).unityInstance)
        (window as any).unityInstance.removeAllEventListeners();
      (window as any).removeEventListener(
        'StartAuthentication',
        startAuthentication,
      );
      (window as any).removeEventListener('GetConfiguration', getConfiguration);
      document.removeEventListener('mousemove', onMouse, false);
    };
  }, [unityContext, onMouse, startAuthentication, getConfiguration]);

  const handleOnClickFullscreen = () => {
    if ((window as any).unityInstance)
      (window as any).unityInstance.setFullscreen(true);
  };

  const btnStyles = {
    verticalAlign: 'top',
    marginLeft: 8,
    marginTop: 16,
    background: '-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)',
    color: '#fff',
    borderColor: '#6f6c6c',
  };

  return (
    <>
      <div>{progress && '....Loading...'}</div>
      {progress && <CircularProgress />}
      <Unity
        className="game-canvas"
        unityContext={unityContext}
        style={{
          width: 'calc(90vh * 1.33)',
          height: '90vh',
          marginTop: 5,
          visibility: isLoaded ? 'visible' : 'hidden',
        }}
      />
      <Button style={btnStyles} size="large" onClick={handleOnClickFullscreen}>
        Fullscreen
      </Button>
    </>
  );
};

const GameWithAuth = withVerification(
  (props: { auth: string; unityContext: UnityContext }) => Game(props),
);

const GamesPage = () => (
  <SectionSlider
    firstSection
    isSlider={false}
    title="Games"
    actions={<Button variant="outlined">Download Desktop App</Button>}
  >
    <Grid container flexDirection="row" flexWrap="wrap" spacing={cardSpacing}>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="Nifty Smashers"
          description="The first NFT brawler on the Ethereum blockchain!"
          image={NiftySmashers}
          onlineCounter={200}
          onPlayOnDesktopClick={() => setSelectedGame('nifty-league-desktop')}
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
                  dialogTitle="Authencation"
                >
                  <GameWithAuth unityContext={smashersContext} />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ minWidth: 80, flex: 1 }}
                  >
                    Play on Web
                  </Button>
                </DialogTrigger>
                <DialogContent
                  aria-labelledby="customized-dialog-title"
                  dialogTitle="Nifty League Desktop"
                >
                  <Downloader />
                </DialogContent>
              </Dialog>
            </>
          }
        />
      </Grid>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="Nifty Smashers WebGL"
          description="The first ever NFT tennis game on the Ethereum blockchain"
          isComingSoon
          image={NiftySmashers}
          onPlayOnDesktopClick={() => setSelectedGame('nifty-league-desktop')}
        />
      </Grid>
    </Grid>
  </SectionSlider>
);

export default GamesPage;
