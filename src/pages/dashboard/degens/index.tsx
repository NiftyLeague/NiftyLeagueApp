/* eslint-disable no-nested-ternary */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSearchParams } from 'react-router-dom';

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
import EnableDisableDegenDialogContent from 'pages/dashboard/degens/dialogs/EnableDegenDialogContent';
import SortButton from 'components/extended/SortButton';
import CollapsibleSidebarLayout from 'components/layout/CollapsibleSidebarLayout';
import SectionTitle from 'components/sections/SectionTitle';
import { DEGEN_BASE_API_URL } from 'constants/url';
import useFetch from 'hooks/useFetch';
import usePagination from 'hooks/usePagination';
import { DegenFilter } from 'types/degenFilter';
import { Degen } from 'types/degens';
import { v4 as uuidv4 } from 'uuid';
import { NetworkContext } from 'NetworkProvider';
import { Owner } from 'types/graph';
import { useQuery } from '@apollo/client';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { CHARACTERS_SUBGRAPH_INTERVAL } from '../../../constants';
import EmptyState from 'components/EmptyState';
import DegenDialog from 'components/dialog/DegenDialog';

// Needs to be divisible by 2, 3, or 4
const DEGENS_PER_PAGE = 12;

const DashboardDegensPage = (): JSX.Element => {
  const { address } = useContext(NetworkContext);
  const [degens, setDegens] = useState<Degen[]>([]);
  const [filters, setFilters] = useState<DegenFilter>(DEFAULT_STATIC_FILTER);
  const [defaultValues, setDefaultValues] = useState<DegenFilter | undefined>();
  const [selectedDegen, setSelectedDegen] = useState<Degen>();
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] =
    useState<boolean>(false);
  const [isEnableDisableDegenModalOpen, setIsEnableDisableDegenModalOpen] =
    useState<boolean>(false);
  const [isDegenModalOpen, setIsDegenModalOpen] = useState<boolean>(false);
  const [isClaimDialog, setIsClaimDialog] = useState<boolean>(false);
  const [isRentDialog, setIsRentDialog] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const { data } = useFetch<Degen[]>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );

  const {
    loading,
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

  const { jump, updateNewData, currentData, newData, maxPage, currentPage } =
    usePagination(filteredDegens, DEGENS_PER_PAGE);

  const currentDataMemoized = useMemo(() => currentData(), [currentData]);

  const hasData = currentDataMemoized.length > 0;

  useEffect(() => {
    if (filteredDegens && filteredDegens.length) {
      const originalDegens: Degen[] = Object.values(filteredDegens);
      setDefaultValues(getDefaultFilterValueFromData(originalDegens));
      setDegens(originalDegens);
      const params = Object.fromEntries(searchParams.entries());
      let newDegens = originalDegens;
      if (!isEmpty(params)) {
        const newFilterOptions = updateFilterValue(defaultValues, params);
        setFilters(newFilterOptions);
        newDegens = tranformDataByFilter(originalDegens, newFilterOptions);
      }
      updateNewData(newDegens);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredDegens]);

  const handleFilter = useCallback(
    (filter: DegenFilter) => {
      const newFilters = { ...filter, sort: filters.sort };
      const result = tranformDataByFilter(degens, newFilters);
      setFilters(newFilters);
      updateNewData(result);
    },
    [degens, filters.sort, setFilters, updateNewData],
  );

  const handleSort = useCallback(
    (sort: string) => {
      const newSort = { ...filters, sort };
      setFilters(newSort);
      updateNewData(tranformDataByFilter(degens, newSort));
    },
    [degens, filters, updateNewData],
  );

  const handleEnableDisable = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsEnableDisableDegenModalOpen(true);
  }, []);

  const handleClickEditName = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRenameDegenModalOpen(true);
  }, []);

  const handleViewTraits = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsClaimDialog(false);
    setIsRentDialog(false);
    setIsDegenModalOpen(true);
  }, []);

  const handleClaimDegen = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsClaimDialog(true);
    setIsRentDialog(false);
    setIsDegenModalOpen(true);
  }, []);

  const handleRentDegen = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRentDialog(true);
    setIsClaimDialog(false);
    setIsDegenModalOpen(true);
  }, []);

  const handleBuyDegen = () => {
    window.open('https://opensea.io/collection/niftydegen', '_blank');
  };

  return (
    <>
      <CollapsibleSidebarLayout
        // Filter drawer
        drawerWidth={hasData ? 320 : 0}
        renderDrawer={() =>
          hasData &&
          !isEmpty(defaultValues) && (
            <DegensFilter
              onFilter={handleFilter}
              defaultFilterValues={defaultValues as DegenFilter}
            />
          )
        }
        // Main grid
        renderMain={({ isDrawerOpen, setIsDrawerOpen }) => (
          <Stack gap={2}>
            {/* Main Grid title */}
            <SectionTitle
              firstSection
              actions={
                hasData && (
                  <SortButton handleSort={handleSort}>
                    <Button
                      id="demo-positioned-button"
                      aria-controls="demo-positioned-menu"
                      aria-haspopup="true"
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    />
                  </SortButton>
                )
              }
            >
              <Stack direction="row" alignItems="center" gap={1}>
                {hasData && (
                  <IconButton
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    size="large"
                  >
                    {isDrawerOpen ? <IconChevronLeft /> : <IconChevronRight />}
                  </IconButton>
                )}
                {newData.length} Degens
              </Stack>
            </SectionTitle>
            {/* Main grid content */}
            <Grid container spacing={2}>
              {loading || !address ? (
                [...Array(8)].map(() => (
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
                ))
              ) : filteredDegens.length && characters.length ? (
                currentDataMemoized.map((degen: Degen) => (
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
                      id={degen.id}
                      name={degen.name}
                      multiplier={degen.multiplier}
                      owner={degen.owner}
                      price={degen.price}
                      background={degen.background}
                      activeRentals={degen.rental_count}
                      isEnabled={degen.is_active}
                      isDashboardDegen
                      onEnableDisable={() => handleEnableDisable(degen)}
                      onClickDetail={() => handleViewTraits(degen)}
                      onClickEditName={() => handleClickEditName(degen)}
                      onClickClaim={() => handleClaimDegen(degen)}
                      onClickRent={() => handleRentDegen(degen)}
                    />
                  </Grid>
                ))
              ) : (
                <EmptyState
                  message="No DEGENs found. Please check your address or go purchase a degen if you have not done so already!"
                  buttonText="Buy a DEGEN"
                  onClick={handleBuyDegen}
                />
              )}
            </Grid>
            {hasData && (
              <Pagination
                count={maxPage}
                page={currentPage}
                color="primary"
                sx={{ margin: '0 auto' }}
                onChange={(e: React.ChangeEvent<unknown>, p: number) => jump(p)}
              />
            )}
          </Stack>
        )}
      />
      <DegenDialog
        open={isDegenModalOpen}
        degen={selectedDegen}
        isClaim={isClaimDialog}
        isRent={isRentDialog}
        setIsRent={setIsRentDialog}
        onClose={() => setIsDegenModalOpen(false)}
      />
      <Dialog
        open={isRenameDegenModalOpen}
        onClose={() => setIsRenameDegenModalOpen(false)}
      >
        <RenameDegenDialogContent degen={selectedDegen} />
      </Dialog>
      <Dialog
        open={isEnableDisableDegenModalOpen}
        onClose={() => setIsEnableDisableDegenModalOpen(false)}
      >
        <EnableDisableDegenDialogContent
          degen={selectedDegen}
          isEnabled={selectedDegen?.is_active}
        />
      </Dialog>
    </>
  );
};

export default DashboardDegensPage;
