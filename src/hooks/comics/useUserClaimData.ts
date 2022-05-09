import { useContext, useEffect, useState } from 'react';
import { ChainId } from '@sushiswap/sdk';
import { utils } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import { COMICS_MERKLE_ROOT } from 'constants/contracts';

const { getAddress, isAddress } = utils;

interface UserClaimData {
  index: number;
  amount0: string;
  amount1: string;
  proof: string[];
}

const CLAIM_PROMISES: { [key: string]: Promise<any | UserClaimData | null> } =
  {};

// returns the claim for the given address, or null if not valid
function fetchClaim(
  account: string,
  chainId: ChainId,
): Promise<any | UserClaimData | null> {
  if (!isAddress(account)) return Promise.reject(new Error('Invalid address'));
  const key = `${chainId}:${account}`;
  // eslint-disable-next-line no-return-assign
  return (CLAIM_PROMISES[key] =
    CLAIM_PROMISES[key] ??
    fetch(COMICS_MERKLE_ROOT)
      .then((response) => response.json())
      .then((data: { claims: { [address: string]: UserClaimData } }) => {
        const claim: UserClaimData | undefined =
          data.claims[getAddress(account)] ?? undefined;
        if (!claim) return null;
        return {
          index: claim.index,
          amount0: claim.amount0,
          amount1: claim.amount1,
          proof: claim.proof,
        };
      })
      .catch((error) => console.error('Failed to get claim data', error)));
}

// parse distributorContract blob and detect if user has claim data
// null means we know it does not
export default function useUserClaimData(): UserClaimData | null | undefined {
  const { selectedChainId, address: account } = useContext(NetworkContext);
  const key = `${selectedChainId as number}:${account}`;
  const [claimInfo, setClaimInfo] = useState<{
    [key: string]: UserClaimData | null;
  }>({});

  useEffect(() => {
    if (!account || !selectedChainId) return;
    void fetchClaim(account, selectedChainId).then(
      (accountClaimInfo: UserClaimData) =>
        setClaimInfo((prevClaimInfo) => ({
          ...prevClaimInfo,
          [key]: accountClaimInfo,
        })),
    );
  }, [account, selectedChainId, key]);

  return account && selectedChainId ? claimInfo[key] : undefined;
}