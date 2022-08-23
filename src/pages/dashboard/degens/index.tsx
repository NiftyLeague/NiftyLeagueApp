/* eslint-disable no-nested-ternary */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Button,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Dialog,
} from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';

import DegenCard from 'components/cards/DegenCard';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import DegensFilter from 'components/extended/DegensFilter';
import DEFAULT_STATIC_FILTER from 'components/extended/DegensFilter/constants';
import {
  tranformDataByFilter,
  updateFilterValue,
  getDefaultFilterValueFromData,
} from 'components/extended/DegensFilter/utils';
import RenameDegenDialogContent from 'pages/dashboard/degens/dialogs/RenamDegenDialogContent';
import SortButton from 'components/extended/SortButton';
import CollapsibleSidebarLayout from 'components/layout/CollapsibleSidebarLayout';
import SectionTitle from 'components/sections/SectionTitle';
import { DEGEN_BASE_API_URL, DEGEN_PURCHASE_URL } from 'constants/url';
import useFetch from 'hooks/useFetch';
import usePagination from 'hooks/usePagination';
import { DegenFilter } from 'types/degenFilter';
import { Degen } from 'types/degens';
import { v4 as uuidv4 } from 'uuid';
import { NetworkContext } from 'NetworkProvider';
import { Owner } from 'types/graph';
import { useQuery } from '@apollo/client';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { CHARACTERS_SUBGRAPH_INTERVAL } from 'constants/index';
import EmptyState from 'components/EmptyState';
import DegenDialog from 'components/dialog/DegenDialog';

// Needs to be divisible by 2, 3, or 4
const DEGENS_PER_PAGE = 12;

const handleBuyDegen = () => {
  window.open(DEGEN_PURCHASE_URL, '_blank');
};

const DashboardDegensPage = (): JSX.Element => {
  const { address } = useContext(NetworkContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [filters, setFilters] = useState<DegenFilter>(DEFAULT_STATIC_FILTER);
  const [defaultValues, setDefaultValues] = useState<DegenFilter | undefined>(
    DEFAULT_STATIC_FILTER,
  );
  const [filteredData, setFilteredData] = useState<Degen[]>([]);
  const [selectedDegen, setSelectedDegen] = useState<Degen>();
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] =
    useState<boolean>(false);
  const [isDegenModalOpen, setIsDegenModalOpen] = useState<boolean>(false);
  const [isClaimDialog, setIsClaimDialog] = useState<boolean>(false);
  const [isRentDialog, setIsRentDialog] = useState<boolean>(false);
  const [isEquipDialog, setIsEquipDialog] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const { enableEquip } = useFlags();

  const { loading: loadingAllRentals, data } = useFetch<Degen[]>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );

  const {
    loading: loadingUserDegens,
    data: userDegens,
  }: { loading: boolean; data?: { owner: Owner } } = useQuery(OWNER_QUERY, {
    pollInterval: CHARACTERS_SUBGRAPH_INTERVAL,
    variables: { address: address?.toLowerCase() },
    skip: !address,
  });

  const loading = loadingAllRentals || loadingUserDegens;

  const { characters = [] } = userDegens?.owner || {};

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
          background: 'meta',
          earning_cap: 0,
          earning_cap_daily: 0,
          is_active: false,
          last_rented_at: 0,
          multiplier: 2,
          multipliers: { background: 2 },
          owner: '',
          owner_share: 0.1,
          price: 0,
          price_daily: 0,
          rental_count: 0,
          total_rented: 0,
          tribe: 'egg',
        },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters.length, !!data]);

  const { jump, dataForCurrentPage, maxPage, currentPage } = usePagination(
    filteredData,
    DEGENS_PER_PAGE,
  );

  useEffect(() => {
    if (!populatedDegens.length) {
      return;
    }

    setDefaultValues(getDefaultFilterValueFromData(populatedDegens));
    const params = Object.fromEntries(searchParams.entries());
    let newDegens = populatedDegens;
    if (!isEmpty(params)) {
      const newFilterOptions = updateFilterValue(defaultValues, params);
      setFilters(newFilterOptions);
      newDegens = tranformDataByFilter(populatedDegens, newFilterOptions);
    }
    setFilteredData(newDegens);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [populatedDegens.length]);

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

  const handleClickEditName = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRenameDegenModalOpen(true);
  }, []);

  const handleViewTraits = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsClaimDialog(false);
    setIsEquipDialog(false);
    setIsRentDialog(false);
    setIsDegenModalOpen(true);
  }, []);

  const handleClaimDegen = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsClaimDialog(true);
    setIsEquipDialog(false);
    setIsRentDialog(false);
    setIsDegenModalOpen(true);
  }, []);

  const handleRentDegen = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRentDialog(true);
    setIsClaimDialog(false);
    setIsEquipDialog(false);
    setIsDegenModalOpen(true);
  }, []);

  const handleEquipDegen = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRentDialog(false);
    setIsClaimDialog(false);
    setIsEquipDialog(true);
    setIsDegenModalOpen(true);
  }, []);

  const renderSkeletonItem = useCallback(
    () => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={isDrawerOpen ? 4 : 3}
        xl={3}
        key={uuidv4()}
      >
        <SkeletonDegenPlaceholder />
      </Grid>
    ),
    [isDrawerOpen],
  );

  const renderDrawer = useCallback(
    () => (
      <DegensFilter
        onFilter={handleFilter}
        defaultFilterValues={defaultValues as DegenFilter}
        isDegenOwner={true}
      />
    ),
    [defaultValues, handleFilter],
  );

  const renderDegen = useCallback(
    (degen: Degen) => (
      <Grid
        key={degen.id}
        item
        xs={12}
        sm={6}
        md={4}
        lg={isDrawerOpen ? 4 : 3}
        xl={3}
      >
        <DegenCard
          degen={degen}
          isDashboardDegen
          degenEquipEnabled={enableEquip}
          onClickDetail={() => handleViewTraits(degen)}
          onClickEditName={() => handleClickEditName(degen)}
          onClickClaim={() => handleClaimDegen(degen)}
          onClickRent={() => handleRentDegen(degen)}
          onClickEquip={() => handleEquipDegen(degen)}
        />
      </Grid>
    ),
    [
      enableEquip,
      handleClaimDegen,
      handleClickEditName,
      handleRentDegen,
      handleViewTraits,
      handleEquipDegen,
      isDrawerOpen,
    ],
  );

  const renderMain = useCallback(
    () => (
      <Stack gap={2}>
        {/* Main Grid title */}
        <SectionTitle
          firstSection
          actions={
            <SortButton handleSort={handleSort}>
              <Button
                id="demo-positioned-button"
                aria-controls="demo-positioned-menu"
                aria-haspopup="true"
                sx={{ color: 'grey.500', fontWeight: 400 }}
                endIcon={<KeyboardArrowDownIcon />}
              />
            </SortButton>
          }
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <IconButton
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              size="large"
            >
              {isDrawerOpen ? <IconChevronLeft /> : <IconChevronRight />}
            </IconButton>
            {filteredData.length} Degens
          </Stack>
        </SectionTitle>
        {/* Main grid content */}
        <Grid container spacing={2}>
          {loading || !address ? (
            [...Array(8)].map(renderSkeletonItem)
          ) : dataForCurrentPage.length ? (
            dataForCurrentPage.map(renderDegen)
          ) : !characters?.length ? (
            <EmptyState
              message="No DEGENs found. Please check your address or go purchase a degen if you have not done so already!"
              buttonText="Buy a DEGEN"
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
      handleSort,
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
      <CollapsibleSidebarLayout
        drawerWidth={320}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        renderDrawer={renderDrawer}
        renderMain={renderMain}
      />
      <DegenDialog
        open={isDegenModalOpen}
        degen={selectedDegen}
        isClaim={isClaimDialog}
        isRent={isRentDialog}
        isEquip={isEquipDialog}
        setIsRent={setIsRentDialog}
        onClose={() => setIsDegenModalOpen(false)}
      />
      <Dialog
        open={isRenameDegenModalOpen}
        onClose={() => setIsRenameDegenModalOpen(false)}
      >
        <RenameDegenDialogContent degen={selectedDegen} />
      </Dialog>
    </>
  );
};

export default DashboardDegensPage;
