import { useMemo } from 'react';
import { type WalletClient, useWalletClient } from 'wagmi';
import { providers } from 'ethers';

export type Signer = providers.JsonRpcSigner | undefined;

export function walletClientToProvider(
  walletClient: WalletClient,
): providers.Web3Provider {
  const { chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  return new providers.Web3Provider(transport, network);
}

export function walletClientToSigner(
  walletClient: WalletClient,
): providers.JsonRpcSigner {
  const provider = walletClientToProvider(walletClient);
  return provider.getSigner(walletClient.account.address);
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
