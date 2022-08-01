import { UnityContext } from 'react-unity-webgl';
import GameWithAuth from './GameWithAuth';

const burnerBaseUrl = process.env.REACT_APP_UNITY_BURNER_BASE_URL as string;
const burnerBuildVersion = process.env
  .REACT_APP_UNITY_BURNER_BASE_VERSION as string;

export const burnerContext = new UnityContext({
  loaderUrl: `${burnerBaseUrl}/Build/${burnerBuildVersion}.loader.js`,
  dataUrl: `${burnerBaseUrl}/Build/${burnerBuildVersion}.data.br`,
  frameworkUrl: `${burnerBaseUrl}/Build/${burnerBuildVersion}.framework.js.br`,
  codeUrl: `${burnerBaseUrl}/Build/${burnerBuildVersion}.wasm.br`,
  streamingAssetsUrl: `${burnerBaseUrl}/StreamingAssets`,
  companyName: 'NiftyLeague',
  productName: 'Mt.Rugman',
  productVersion: burnerBuildVersion,
});

const MtRugmanGame = () => <GameWithAuth unityContext={burnerContext} />;

export default MtRugmanGame;