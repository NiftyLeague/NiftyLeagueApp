import { useContext, useMemo, createContext } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { NetworkContext } from 'NetworkProvider';
import { useQuery } from '@apollo/client';

import usePlayerProfile from 'hooks/usePlayerProfile';
import useFetch from 'hooks/useFetch';
import useComicsBalance from 'hooks/useComicsBalance';
import useAllRentals from 'hooks/useAllRentals';
import useAccount from 'hooks/useAccount';

import SectionSlider from 'components/sections/SectionSlider';
import ImageProfile from './ImageProfile';
import RightInfo from './Stats/RightInfo';
import LeftInfo from './Stats/LeftInfo';
import TopInfo from './Stats/TopInfo';
import EmptyState from 'components/EmptyState';

import { DEGEN_BASE_API_URL } from 'constants/url';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { CHARACTERS_SUBGRAPH_INTERVAL } from 'constants/index';
import { Owner } from 'types/graph';
import { Degen } from 'types/degens';
import { sectionSpacing } from 'store/constant';

const defaultValue: {
  isLoadingProfile: boolean | undefined;
  isLoadingDegens: boolean | undefined;
  isLoadingComics: boolean | undefined;
  isLoadingRentals: boolean | undefined;
  isLoadingAccount: boolean | undefined;
} = {
  isLoadingProfile: true,
  isLoadingDegens: true,
  isLoadingComics: true,
  isLoadingRentals: true,
  isLoadingAccount: true,
};
export const GamerProfileContext = createContext(defaultValue);

const GamerProfile = (): JSX.Element => {
  const { profile, error, loadingProfile } = usePlayerProfile();
  const { address } = useContext(NetworkContext);
  const { comicsBalance, loading: loadingComics } = useComicsBalance();
  const { data } = useFetch<Degen[]>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );

  const { rentals, loadingRentals } = useAllRentals();
  const { account, loadingAccount } = useAccount();

  const {
    loading: loadingDegens,
    data: userDegens,
  }: { loading: boolean; data?: { owner: Owner } } = useQuery(OWNER_QUERY, {
    pollInterval: CHARACTERS_SUBGRAPH_INTERVAL,
    variables: { address: address?.toLowerCase() },
    skip: !address,
  });

  const characters = useMemo(() => {
    const characterList = userDegens?.owner?.characters
      ? [...userDegens.owner.characters]
      : [];
    return characterList.sort(
      (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10),
    );
  }, [userDegens]);

  const filteredDegens: Degen[] = useMemo(() => {
    if (characters.length && data) {
      const mapDegens = characters.map((character) => data[character.id]);
      return mapDegens;
    }
    return [];
  }, [characters, data]);

  const filteredComics = useMemo(
    () => comicsBalance.filter((comic) => comic.balance && comic.balance > 0),
    [comicsBalance],
  );

  const renderEmptyProfile = () => {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        display="flex"
        height="100%"
      >
        <EmptyState message="You don't own any Gamer Profile yet." />
      </Grid>
    );
  };

  const renderTopProfile = () => {
    return (
      <GamerProfileContext.Provider
        value={{
          isLoadingProfile: loadingProfile,
          isLoadingDegens: loadingDegens,
          isLoadingComics: loadingComics,
          isLoadingRentals: loadingRentals,
          isLoadingAccount: loadingAccount,
        }}
      >
        <Grid item container spacing={3}>
          <Grid item xs={12} md={3.5}>
            <ImageProfile rental={rentals && rentals[0]} />
          </Grid>
          <Grid item xs={12} md={8.5}>
            <TopInfo account={account} total={profile?.stats?.total} />
            <hr />
            <Stack spacing={1}>
              <Stack>
                <Typography variant="h3" component="div">
                  Nifty League Player Stats
                </Typography>
              </Stack>
              <Stack direction="row" spacing={5}>
                <LeftInfo total={profile?.stats?.total} />
                <RightInfo
                  degenCount={filteredDegens?.length}
                  comicCount={filteredComics?.length}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </GamerProfileContext.Provider>
    );
  };

  const renderBottomProfile = () => {
    return (
      <Stack gap={sectionSpacing}>
        <SectionSlider
          firstSection
          title="Player Stats by Game"
        ></SectionSlider>
      </Stack>
    );
  };

  const renderGamerProfile = () => {
    return (
      <>
        {renderTopProfile()}
        {renderBottomProfile()}
      </>
    );
  };
  return (
    <Grid container gap={sectionSpacing}>
      {error && !profile && renderEmptyProfile()}
      {renderGamerProfile()}
    </Grid>
  );
};

export default GamerProfile;
