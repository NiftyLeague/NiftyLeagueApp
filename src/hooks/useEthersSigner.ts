import { useMemo } from 'react';
import { type WalletClient, useWalletClient } from 'wagmi';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

export type Signer = JsonRpcSigner | undefined;

export function walletClientToProvider(
  walletClient: WalletClient,
): BrowserProvider {
  const { chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  return new BrowserProvider(transport, network);
}

export function walletClientToSigner(
  walletClient: WalletClient,
): JsonRpcSigner {
  const { account } = walletClient;
  const provider = walletClientToProvider(walletClient);
  return new JsonRpcSigner(provider, account.address);
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({
  chainId,
}: { chainId?: number } = {}): Signer {
  const { data: walletClient } = useWalletClient({ chainId });
  return useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient],
  );
}

export default useEthersSigner;
