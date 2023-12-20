import { useMemo } from 'react';
import { type PublicClient, usePublicClient } from 'wagmi';
import { FallbackProvider, JsonRpcProvider } from 'ethers6';
import { type HttpTransport } from 'viem';

export type Provider = FallbackProvider | JsonRpcProvider;

export function publicClientToProvider(publicClient: PublicClient): Provider {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<HttpTransport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network),
    );
    if (providers.length === 1) return providers[0];
    return new FallbackProvider(providers);
  }
  return new JsonRpcProvider(transport.url, network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return useMemo(() => publicClientToProvider(publicClient), [publicClient]);
}

export default useEthersProvider;
