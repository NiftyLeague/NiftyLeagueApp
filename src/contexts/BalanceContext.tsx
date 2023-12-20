'use client';

/* eslint-disable no-console */
import { useQuery } from '@apollo/client';
import useClaimableNFTL from '@/hooks/useClaimableNFTL';
import useNFTLBalance from '@/hooks/useNFTLBalance';
import OWNER_QUERY from '@/queries/OWNER_QUERY';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import NetworkContext from './NetworkContext';
import type { Character, Owner } from '@/types/graph';

interface Context {
  isDegenOwner: boolean;
  characterCount: number;
  loading: boolean;
  totalAccrued: number;
  refreshClaimableNFTL: () => void;
  characters: Character[];
  tokenIndices: number[];
  userNFTLBalance: number;
  refreshNFTLBalance: () => void;
  refreshDegenBalance: () => void;
}

const CONTEXT_INITIAL_STATE: Context = {
  isDegenOwner: false,
  characterCount: 0,
  loading: false,
  totalAccrued: 0,
  refreshClaimableNFTL: () => {},
  characters: [],
  tokenIndices: [],
  userNFTLBalance: 0,
  refreshNFTLBalance: () => {},
  refreshDegenBalance: () => {},
};

const BalanceContext = createContext(CONTEXT_INITIAL_STATE);

export const BalanceProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): JSX.Element => {
  const { address } = useContext(NetworkContext);
  const {
    loading,
    data,
    refetch: refetchDegens,
  }: {
    loading: boolean;
    refetch: (params: any) => void;
    data?: { owner: Owner };
  } = useQuery(OWNER_QUERY, {
    variables: { address: address?.toLowerCase() },
    skip: !address,
  });
  const { characterCount = 0 } = data?.owner || {};
  const isDegenOwner = characterCount > 0;

  const characters = useMemo(() => {
    const characterList = data?.owner?.characters
      ? [...data.owner.characters]
      : [];
    return characterList.sort(
      (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10),
    );
  }, [data]);

  const tokenIndices = useMemo(
    () => characters.map((char) => parseInt(char.id, 10)),
    [characters],
  );

  const { totalAccrued, refetch: refreshClaimableNFTL } =
    useClaimableNFTL(tokenIndices);

  const { balance: userNFTLBalance, refetch: refreshNFTLBalance } =
    useNFTLBalance();

  const refreshDegenBalance = useCallback(() => {
    if (address) refetchDegens({ address: address.toLowerCase() });
  }, [address, refetchDegens]);

  useEffect(() => {
    if (!address) return;
    refreshDegenBalance();
    refreshClaimableNFTL();
  }, [address, refreshDegenBalance, refreshNFTLBalance, refreshClaimableNFTL]);

  return (
    <BalanceContext.Provider
      value={{
        loading,
        totalAccrued,
        refreshClaimableNFTL,
        characters,
        tokenIndices,
        isDegenOwner,
        characterCount,
        userNFTLBalance,
        refreshNFTLBalance,
        refreshDegenBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceContext;
