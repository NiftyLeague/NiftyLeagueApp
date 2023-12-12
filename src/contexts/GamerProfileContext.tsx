'use client';

import { useContext, createContext } from 'react';
import { useGamerProfile } from '@/hooks/useGamerProfile';
import useComicsBalance from '@/hooks/useComicsBalance';
import BalanceContext from '@/contexts/BalanceContext';

const defaultValue: {
  isLoadingProfile: boolean | undefined;
  isLoadingDegens: boolean | undefined;
  isLoadingComics: boolean | undefined;
} = {
  isLoadingProfile: true,
  isLoadingDegens: true,
  isLoadingComics: true,
};

const GamerProfileContext = createContext(defaultValue);

export const GamerProfileProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const { loading: loadingDegens } = useContext(BalanceContext);
  const { loadingProfile } = useGamerProfile();
  const { loading: loadingComics } = useComicsBalance();

  return (
    <GamerProfileContext.Provider
      value={{
        isLoadingProfile: loadingProfile,
        isLoadingDegens: loadingDegens,
        isLoadingComics: loadingComics,
      }}
    >
      {children}
    </GamerProfileContext.Provider>
  );
};

export default GamerProfileContext;
