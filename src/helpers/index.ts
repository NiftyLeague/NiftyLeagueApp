import {
  BigNumber,
  BigNumberish,
  constants,
  Contract,
  ContractInterface,
  providers,
  Signer,
  utils,
} from 'ethers';
import { Provider } from 'types/web3';

export * from './dateTime';
export * from './ipfs';

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export const isZero = (hexNumberString: string): boolean =>
  /^0x0*$/.test(hexNumberString);

export const formatBalance = (
  value: BigNumberish,
  decimals = 18,
  maxFraction = 0,
): string => {
  const formatted = utils.formatUnits(value, decimals);
  if (maxFraction > 0) {
    const split = formatted.split('.');
    if (split.length > 1) {
      return `${split[0]}.${split[1].substr(0, maxFraction)}`;
    }
  }
  return formatted;
};

export const parseBalance = (value: string, decimals = 18): BigNumber =>
  utils.parseUnits(value || '0', decimals);

export const isEmptyValue = (text: string): boolean =>
  BigNumber.isBigNumber(text)
    ? BigNumber.from(text).isZero()
    : text === '' || text.replace(/0/g, '').replace(/\./, '') === '';

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = (value: unknown): string | false => {
  try {
    return utils.getAddress(value as string);
  } catch {
    return false;
  }
};

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export const shortenAddress = (address: string, chars = 4): string => {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
};

// add 10% margin, set minimumGas for greater of 20% margin or minumum on complex calls
export const calculateGasMargin = (
  value: BigNumber,
  minimumGas?: BigNumber,
): BigNumber => {
  if (minimumGas) {
    const calculatedWithMargin = value
      .mul(BigNumber.from(10000).add(BigNumber.from(2000)))
      .div(BigNumber.from(10000));
    return calculatedWithMargin < minimumGas
      ? minimumGas
      : calculatedWithMargin;
  }
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
};

// account is not optional
export const getSigner = (
  provider: providers.Web3Provider,
  account: string,
): Signer => provider.getSigner(account).connectUnchecked();

// account is optional
export const getProviderOrSigner = (
  provider: Provider,
  account?: string,
): Provider | Signer =>
  account && 'getSigner' in provider
    ? getSigner(provider as providers.Web3Provider, account)
    : provider;

export const getContract = (
  address: string,
  ABI: ContractInterface,
  provider: Provider,
  account?: string,
): Contract => {
  if (!isAddress(address) || address === constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(provider, account));
};

export const getProviderAndSigner = (
  providerOrSigner: Provider | Signer,
): { provider: Provider | undefined; signer: Signer | undefined } => {
  let signer: Signer | undefined;
  let provider: Provider | undefined;
  if (Signer.isSigner(providerOrSigner)) {
    signer = providerOrSigner;
    provider = signer.provider;
  } else if (providerOrSigner && 'getSigner' in providerOrSigner) {
    signer = providerOrSigner.getSigner();
    provider = providerOrSigner;
  } else {
    signer = undefined;
    provider = providerOrSigner;
  }

  return { provider, signer };
};
