import { useUnityContext } from 'react-unity-webgl';
import GameWithAuth from './GameWithAuth';

const wenBaseUrl = process.env.REACT_APP_UNITY_WEN_BASE_URL as string;
const wenBuildVersion = process.env.REACT_APP_UNITY_WEN_BASE_VERSION as string;

const WenGame = () => {
  const wenContext = useUnityContext({
    loaderUrl: `${wenBaseUrl}/Build/${wenBuildVersion}.loader.js`,
    dataUrl: `${wenBaseUrl}/Build/${wenBuildVersion}.data.br`,
    frameworkUrl: `${wenBaseUrl}/Build/${wenBuildVersion}.framework.js.br`,
    codeUrl: `${wenBaseUrl}/Build/${wenBuildVersion}.wasm.br`,
    streamingAssetsUrl: `${wenBaseUrl}/StreamingAssets`,
    companyName: 'NiftyLeague',
    productName: 'WENGame',
    productVersion: wenBuildVersion,
  });
  return <GameWithAuth unityContext={wenContext} arcadeTokenRequired />;
};

export default WenGame;
