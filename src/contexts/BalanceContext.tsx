/* eslint-disable no-console */
import { useQuery } from '@apollo/client';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import useNFTLBalance from 'hooks/useNFTLBalance';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Character, Owner } from 'types/graph';
import NetworkContext from './NetworkContext';
import WindowContext from './WindowContext';

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
};

const BalanceContext = createContext(CONTEXT_INITIAL_STATE);

export const BalanceProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): JSX.Element => {
  const { address, readContracts } = useContext(NetworkContext);
  const { active } = useContext(WindowContext);
  const [refreshClaimKey, setRefreshClaimKey] = useState(0);
  const [refreshBalKey, setRefreshBalKey] = useState(0);
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

  const totalAccrued = useClaimableNFTL(
    readContracts,
    tokenIndices,
    refreshClaimKey,
  );

  const userNFTLBalance = useNFTLBalance(address, refreshBalKey);

  const refreshClaimableNFTL = () => {
    setRefreshClaimKey(Math.random());
  };

  const refreshNFTLBalance = () => {
    setRefreshBalKey(Math.random());
  };

  useEffect(() => {
    if (!active || !address) {
      return;
    }

    refetchDegens({ address: address.toLowerCase() });
    refreshClaimableNFTL();
    refreshNFTLBalance();
  }, [active, address, refetchDegens]);

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
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceContext;
