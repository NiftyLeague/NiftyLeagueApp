import { useUnityContext } from 'react-unity-webgl';
import GameWithAuth from './GameWithAuth';

const smashersBaseUrl = process.env.REACT_APP_UNITY_SMASHERS_BASE_URL as string;
const smashersBuildVersion = process.env
  .REACT_APP_UNITY_SMASHERS_BASE_VERSION as string;

const useCompressed = process.env.REACT_APP_UNITY_USE_COMPRESSED !== 'false';

const SmashersGame = () => {
  const smashersContext = useUnityContext({
    loaderUrl: `${smashersBaseUrl}/Build/${smashersBuildVersion}.loader.js`,
    dataUrl: `${smashersBaseUrl}/Build/${smashersBuildVersion}.data${
      useCompressed ? '.br' : ''
    }`,
    frameworkUrl: `${smashersBaseUrl}/Build/${smashersBuildVersion}.framework.js${
      useCompressed ? '.br' : ''
    }`,
    codeUrl: `${smashersBaseUrl}/Build/${smashersBuildVersion}.wasm${
      useCompressed ? '.br' : ''
    }`,
    streamingAssetsUrl: `${smashersBaseUrl}/StreamingAssets`,
    companyName: 'NiftyLeague',
    productName: 'NiftySmashers',
    productVersion: smashersBuildVersion,
  });

  return <GameWithAuth unityContext={smashersContext} />;
};

export default SmashersGame;
