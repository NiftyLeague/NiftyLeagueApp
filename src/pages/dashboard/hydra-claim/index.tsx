/* eslint-disable no-nested-ternary */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { providers } from 'ethers';
import isEmpty from 'lodash/isEmpty';
import { useSearchParams } from 'react-router-dom';
import { Dialog, Stack } from '@mui/material';

import DegensFilter from 'components/extended/DegensFilter';
import DEFAULT_STATIC_FILTER from 'components/extended/DegensFilter/constants';
import {
  tranformDataByFilter,
  updateFilterValue,
} from 'components/extended/DegensFilter/utils';
import CollapsibleSidebarLayout from 'components/layout/CollapsibleSidebarLayout';
import { DEGEN_BASE_API_URL } from 'constants/url';
import { DAO_BURN_ADDY } from 'constants/addresses';
import useFetch from 'hooks/useFetch';
import { DegenFilter } from 'types/degenFilter';
import { Degen } from 'types/degens';
import NetworkContext from 'contexts/NetworkContext';
import BalanceContext from 'contexts/BalanceContext';
import DegensTopNav from 'components/extended/DegensTopNav';
import BurnDegensDialog from './dialogs/BurnDegensDialog';
import ClaimSuccessDialog from './dialogs/ClaimSuccessDialog';
import MainSection from './MainSection';

const DashboardHydraClaimPage = (): JSX.Element => {
  const { address, userProvider } = useContext(NetworkContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hydraID, setHydraID] = useState<number>();
  const [burnDialogOpen, setBurnDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_STATIC_FILTER);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_STATIC_FILTER);
  const [filteredData, setFilteredData] = useState<Degen[]>([]);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [layoutMode, setLayoutMode] = useState<string>('gridOn');
  const [selectedDegens, setSelectedDegens] = useState<Degen[]>([]);

  const incorrectDegenSelection =
    selectedDegens.length !== 8 ||
    (address.toLowerCase() === DAO_BURN_ADDY.toLowerCase() &&
      selectedDegens.length < 12);

  const { loading: loadingAllRentals, data } = useFetch<Degen[]>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );

  const {
    loading: loadingUserDegens,
    characters,
    refreshDegenBalance,
  } = useContext(BalanceContext);

  const loading = loadingAllRentals || loadingUserDegens;

  const populatedDegens: Degen[] = useMemo(() => {
    if (!characters.length || !data) {
      return [];
    }
    // TODO: remove temp fix for 7th tribes
    return characters.map(
      (character) =>
        data[character.id] || {
          id: character.id,
          name: character.name,
          traits_string: Object.values(character.traits).toString(),
          background: '???',
          earning_cap: 0,
          earning_cap_daily: 0,
          is_active: false,
          last_rented_at: 0,
          multiplier: 0,
          multipliers: { background: 0 },
          owner: '',
          owner_share: 0.1,
          price: 0,
          price_daily: 0,
          rental_count: 0,
          total_rented: 0,
          tribe: 'Hydra',
        },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters.length, !!data]);

  useEffect(() => {
    if (!populatedDegens.length) return;
    setDefaultValues((defaultState: DegenFilter) => ({
      ...defaultState,
      backgrounds: ['Common'],
      tribes: ['Ape', 'Alien', 'Frog', 'Doge', 'Cat', 'Human'],
    }));
    const params = Object.fromEntries(searchParams.entries());
    let newDegens = populatedDegens;
    if (!isEmpty(params)) {
      if (params.searchTerm) setSearchTerm(params.searchTerm);
      const newFilterOptions = updateFilterValue(defaultValues, params);
      setFilters(newFilterOptions);
      newDegens = tranformDataByFilter(populatedDegens, newFilterOptions);
    }
    setFilteredData(newDegens);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [populatedDegens.length]);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeLayoutMode = (
    _: React.MouseEvent<HTMLElement>,
    newMode: string,
  ) => {
    setLayoutMode(newMode);
  };

  const handleFilter = useCallback(
    (filter: DegenFilter) => {
      const newFilters = { ...filter, sort: filters.sort };
      const result = tranformDataByFilter(populatedDegens, newFilters);
      setFilters(newFilters);
      setFilteredData(result);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [populatedDegens.length, filters.sort],
  );

  const handleSort = useCallback(
    (sort: string) => {
      const newSort = { ...filters, sort };
      setFilters(newSort);
      setFilteredData(tranformDataByFilter(populatedDegens, newSort));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [populatedDegens.length, filters],
  );

  const handleOnSuccess = useCallback(
    async (claimResult: providers.TransactionResponse) => {
      setSelectedDegens([]);
      setBurnDialogOpen(false);
      const txReceipt = await userProvider?.getTransactionReceipt(
        claimResult.hash,
      );
      const finalLog = txReceipt?.logs?.pop();
      const hydraHex = finalLog?.topics?.pop();
      setHydraID(hydraHex ? parseInt(hydraHex) : undefined);
      setSuccessDialogOpen(true);
    },
    [userProvider],
  );

  const handleOnCloseSuccessDialog = useCallback(() => {
    setSuccessDialogOpen(false);
    refreshDegenBalance();
  }, [refreshDegenBalance]);

  const renderDrawer = useCallback(
    () => (
      <DegensFilter
        onFilter={handleFilter}
        defaultFilterValues={defaultValues as DegenFilter}
        isDegenOwner={true}
        searchTerm={searchTerm}
      />
    ),
    [defaultValues, handleFilter, searchTerm],
  );

  const renderMain = useCallback(
    () => (
      <MainSection
        characters={characters}
        filteredData={filteredData}
        incorrectDegenSelection={incorrectDegenSelection}
        isDrawerOpen={isDrawerOpen}
        layoutMode={layoutMode}
        loading={loading}
        selectedDegens={selectedDegens}
        setBurnDialogOpen={setBurnDialogOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        setSelectedDegens={setSelectedDegens}
      />
    ),
    [
      characters,
      filteredData,
      incorrectDegenSelection,
      isDrawerOpen,
      layoutMode,
      loading,
      selectedDegens,
      setBurnDialogOpen,
      setIsDrawerOpen,
      setSelectedDegens,
    ],
  );

  return (
    <>
      <Stack mt={2.5} spacing={2}>
        <Stack pl={2} pr={3}>
          <DegensTopNav
            searchTerm={searchTerm || ''}
            handleChangeSearchTerm={handleChangeSearchTerm}
            handleSort={handleSort}
            layoutMode={layoutMode}
            handleChangeLayoutMode={handleChangeLayoutMode}
          />
        </Stack>
        <CollapsibleSidebarLayout
          drawerWidth={320}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          renderDrawer={renderDrawer}
          renderMain={renderMain}
        />
      </Stack>
      <Dialog open={burnDialogOpen} onClose={() => setBurnDialogOpen(false)}>
        <BurnDegensDialog
          selectedDegens={selectedDegens}
          incorrectDegenSelection={incorrectDegenSelection}
          onSuccess={handleOnSuccess}
        />
      </Dialog>
      <Dialog open={successDialogOpen} onClose={handleOnCloseSuccessDialog}>
        <ClaimSuccessDialog
          hydraID={hydraID}
          onClose={handleOnCloseSuccessDialog}
        />
      </Dialog>
    </>
  );
};

export default DashboardHydraClaimPage;
