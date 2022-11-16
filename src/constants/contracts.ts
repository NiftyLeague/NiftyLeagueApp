import { ChainId } from '@sushiswap/sdk';
import { LOCAL_CHAIN_ID } from './networks';

export const NFT_CONTRACT = 'NiftyDegen';

export const NFTL_CONTRACT = 'NFTLToken';

export const GAME_ACCOUNT_CONTRACT = 'BalanceManager';

export const COMICS_CONTRACT = 'NiftyLaunchComics';

export const COMICS_BURNER_CONTRACT = 'NiftyBurningComicsL2';

export const MERKLE_DISTRIBUTOR_ADDRESS = {
  [LOCAL_CHAIN_ID]: '0x998abeb3E57409262aE5b751f60747921B33613E',
  [ChainId.MAINNET]: '0x921c673a4d2f6a429551c0726316c1ad07571db5',
  [ChainId.GÖRLI]: '0xFeB2f45A3817EF9156a6c771FfC90098d3DFe003',
};

export const MERKLE_ROOT =
  'https://raw.githubusercontent.com/NiftyLeague/merkle-distributor/master/data/result.json';

export const COMICS_MERKLE_DISTRIBUTOR_ADDRESS = {
  [LOCAL_CHAIN_ID]: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  [ChainId.MAINNET]: '0x038FbfE31A113952C15C688Df5b025959f589ad7',
  [ChainId.GÖRLI]: '0x5DCcEEd8E10a3EE1aF095B248ad66E8F33875045',
};

export const COMICS_MERKLE_ROOT =
  'https://raw.githubusercontent.com/NiftyLeague/merkle-distributor-comics56/main/data/result.json';

export const COWSWAP_VAULT_RELAYER_ADDRESS =
  '0xC92E8bdf79f0507f65a392b0ab4667716BFE0110';

export const WETH_ADDRESS = {
  [ChainId.MAINNET]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [ChainId.GÖRLI]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
};

export const IMX_NL_ITEMS = {
  [ChainId.MAINNET]: '0xf5Bb757BBf6cfab02e221E882c32E859Fb324C41', // TODO: add mainnet on deploy
  [ChainId.GÖRLI]: '0xf5Bb757BBf6cfab02e221E882c32E859Fb324C41',
};
