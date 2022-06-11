import { UnityContext } from 'react-unity-webgl';
import GameWithAuth from './GameWithAuth';

const smashersBaseUrl = process.env.REACT_APP_UNITY_SMASHERS_BASE_URL as string;
const smashersBuildVersion = process.env
  .REACT_APP_UNITY_SMASHERS_BASE_VERSION as string;

export const smashersContext = new UnityContext({
  loaderUrl: `${smashersBaseUrl}/Build/${smashersBuildVersion}.loader.js`,
  dataUrl: `${smashersBaseUrl}/Build/${smashersBuildVersion}.data.br`,
  frameworkUrl: `${smashersBaseUrl}/Build/${smashersBuildVersion}.framework.js.br`,
  codeUrl: `${smashersBaseUrl}/Build/${smashersBuildVersion}.wasm.br`,
  streamingAssetsUrl: `${smashersBaseUrl}/StreamingAssets`,
  companyName: 'NiftyLeague',
  productName: 'NiftySmashers',
  productVersion: smashersBuildVersion,
});

const SmashersGame = () => <GameWithAuth unityContext={smashersContext} />;

export default SmashersGame;
