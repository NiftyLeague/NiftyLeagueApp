import { ChainId } from '@sushiswap/sdk';

// MY ALCHEMY_ID, SWAP IN YOURS FROM https://dashboard.alchemyapi.io/
export const ALCHEMY_ID: { [key in ChainId]?: string } = {
  [ChainId.MAINNET]: process.env.REACT_APP_ALCHEMY_MAINNET_API as string,
  [ChainId.RINKEBY]: process.env.REACT_APP_ALCHEMY_RINKEBY_API as string,
};

export const SUBGRAPH_URI = `${process.env.REACT_APP_SUBGRAPH_URI as string}${
  process.env.REACT_APP_SUBGRAPH_VERSION as string
}`;

export const DEBUG =
  process.env.NODE_ENV === 'development' ||
  process.env.REACT_APP_DEBUG === 'true';

// Request polling intervals

export const REMOVED_TRAITS_INTERVAL = DEBUG ? 20000 : 60000;
export const BALANCE_INTERVAL = DEBUG ? 300000 : 10000;
