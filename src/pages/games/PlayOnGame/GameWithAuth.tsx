import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, Stack } from '@mui/material';
import Unity, { UnityContext } from 'react-unity-webgl';
import { NetworkContext } from 'NetworkProvider';
import withVerification from 'components/Authentication';
import { NETWORK_NAME } from 'constants/networks';
import Preloader from './Preloader';
import { DEBUG } from 'constants/index';

const baseUrl = process.env.REACT_APP_UNITY_SMASHERS_BASE_URL as string;
const buildVersion = process.env
  .REACT_APP_UNITY_SMASHERS_BASE_VERSION as string;

export const smashersContext = new UnityContext({
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
    (window as any).unityInstance.setFullscreen(true);
  };

  return (
    <>
      <Preloader ready={isLoaded} progress={progress} />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        width="100%"
        gap={1}
      >
        <Unity
          className="game-canvas"
          unityContext={unityContext}
          style={{
            width: 'calc(89vh * 1.33)',
            height: '89vh',
            visibility: isLoaded ? 'visible' : 'hidden',
          }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleOnClickFullscreen}
        >
          Fullscreen
        </Button>
      </Stack>
    </>
  );
};

const GameWithAuth = withVerification(
  (props: { auth: string; unityContext: UnityContext }) => Game(props),
);

export default GameWithAuth;
