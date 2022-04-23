import { IPNS_URL } from '../constants';

export function makeImageGatewayURL(ipfsURI: string): string {
  return `${process.env.REACT_APP_IPFS_GATEWAY as string}/ipfs/${ipfsURI.slice(
    'ipfs://'.length,
  )}`;
}

export async function ResolveImageURL(
  tokenId: number | string,
): Promise<string | null> {
  // TODO: can grab directly from contract once gateway is up
  // const metadata = await nftContract.methods.tokenURI("1").call()
  try {
    const response = await fetch(`${IPNS_URL}/${tokenId}.json`);
    if (!response?.ok) throw new Error(response?.statusText);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json: { image: string } = await response.json();
    if (!json.image) throw new Error("image doesn't exist");
    return makeImageGatewayURL(json.image);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`ERROR occured fetching metadata for token #${tokenId}`);
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
}
