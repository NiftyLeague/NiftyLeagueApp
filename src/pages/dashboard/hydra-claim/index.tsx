/* eslint-disable no-nested-ternary */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useSearchParams } from 'react-router-dom';
import {
  Grid,
  IconButton,
  Pagination,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

import DegenCard from 'components/cards/DegenCard';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import DegensFilter from 'components/extended/DegensFilter';
import DEFAULT_STATIC_FILTER from 'components/extended/DegensFilter/constants';
import {
  tranformDataByFilter,
  updateFilterValue,
} from 'components/extended/DegensFilter/utils';
import CollapsibleSidebarLayout from 'components/layout/CollapsibleSidebarLayout';
import SectionTitle from 'components/sections/SectionTitle';
import { DEGEN_BASE_API_URL, DEGEN_OPENSEA_URL } from 'constants/url';
import useFetch from 'hooks/useFetch';
import usePagination from 'hooks/usePagination';
import { DegenFilter } from 'types/degenFilter';
import { Degen } from 'types/degens';
import { v4 as uuidv4 } from 'uuid';
import NetworkContext from 'contexts/NetworkContext';
import EmptyState from 'components/EmptyState';
import BalanceContext from 'contexts/BalanceContext';
import DegensTopNav from 'components/extended/DegensTopNav';

// Needs to be divisible by 2, 3, or 4
const DEGENS_PER_PAGE = 96;

const handleBuyDegen = () => {
  window.open(DEGEN_OPENSEA_URL, '_blank');
};

const DashboardHydraClaimPage = (): JSX.Element => {
  const { address } = useContext(NetworkContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [filters, setFilters] = useState<DegenFilter>(DEFAULT_STATIC_FILTER);
  const [defaultValues, setDefaultValues] = useState<DegenFilter | undefined>(
    DEFAULT_STATIC_FILTER,
  );
  const [filteredData, setFilteredData] = useState<Degen[]>([]);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [layoutMode, setLayoutMode] = useState<string>('gridOn');

  const { loading: loadingAllRentals, data } = useFetch<Degen[]>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );

  const { loading: loadingUserDegens, characters } = useContext(BalanceContext);

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

  const theme = useTheme();
  const isScreenLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));

  const { jump, dataForCurrentPage, maxPage, currentPage } = usePagination(
    filteredData,
    isScreenLg && layoutMode !== 'gridView' && !isDrawerOpen
      ? 15
      : DEGENS_PER_PAGE,
  );

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

  useEffect(() => {
    jump(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData.length]);

  const handleSort = useCallback(
    (sort: string) => {
      const newSort = { ...filters, sort };
      setFilters(newSort);
      setFilteredData(tranformDataByFilter(populatedDegens, newSort));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [populatedDegens.length, filters],
  );

  const isGridView = layoutMode === 'gridView';

  const renderSkeletonItem = useCallback(
    () => (
      <Grid
        item
        xs={isGridView ? 12 : 6}
        sm={isGridView ? 6 : 4}
        md={isGridView ? 4 : 3}
        lg={isGridView ? (isDrawerOpen ? 4 : 3) : isDrawerOpen ? 3 : 2.4}
        xl={isGridView ? 3 : 2}
        key={uuidv4()}
      >
        <SkeletonDegenPlaceholder size={isGridView ? 'normal' : 'small'} />
      </Grid>
    ),
    [isDrawerOpen, isGridView],
  );

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

  const renderDegen = useCallback(
    (degen: Degen) => (
      <Grid
        key={degen.id}
        item
        xs={isGridView ? 12 : 6}
        sm={isGridView ? 6 : 4}
        md={isGridView ? 4 : 3}
        lg={isGridView ? (isDrawerOpen ? 4 : 3) : isDrawerOpen ? 3 : 2.4}
        xl={isGridView ? 3 : 2}
      >
        <DegenCard
          degen={degen}
          //   isDashboardDegen
          size={isGridView ? 'normal' : 'small'}
        />
      </Grid>
    ),
    [isDrawerOpen, isGridView],
  );

  const renderMain = useCallback(
    () => (
      <Stack gap={1.5}>
        {/* Main Grid title */}
        <SectionTitle firstSection>
          <Stack direction="row" alignItems="center" gap={1}>
            <IconButton
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              size="small"
            >
              {isDrawerOpen ? <ArrowBackIosNew /> : <ArrowForwardIos />}
            </IconButton>
            {filteredData.length} Degens
          </Stack>
        </SectionTitle>
        {/* Main grid content */}
        <Grid container spacing={2} mt={-4.5}>
          {loading || !address ? (
            [...Array(8)].map(renderSkeletonItem)
          ) : dataForCurrentPage.length ? (
            dataForCurrentPage.map(renderDegen)
          ) : !characters?.length ? (
            <EmptyState
              message="No DEGENs found. Please check your address or go purchase a degen if you have not done so already!"
              buttonText="Buy some DEGENs"
              onClick={handleBuyDegen}
            />
          ) : null}
        </Grid>
        {dataForCurrentPage.length > 0 && (
          <Pagination
            count={maxPage}
            page={currentPage}
            color="primary"
            sx={{ margin: '0 auto' }}
            onChange={(e: React.ChangeEvent<unknown>, p: number) => jump(p)}
          />
        )}
      </Stack>
    ),
    [
      isDrawerOpen,
      filteredData.length,
      loading,
      address,
      renderSkeletonItem,
      dataForCurrentPage,
      renderDegen,
      characters?.length,
      maxPage,
      currentPage,
      jump,
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
    </>
  );
};

export default DashboardHydraClaimPage;
