import { useCallback, useContext, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import {
  Grid,
  IconButton,
  Pagination,
  Stack,
  Dialog,
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
  getDefaultFilterValueFromData,
} from 'components/extended/DegensFilter/utils';
import RenameDegenDialogContent from 'pages/dashboard/degens/dialogs/RenamDegenDialogContent';
import CollapsibleSidebarLayout from 'components/layout/CollapsibleSidebarLayout';
import SectionTitle from 'components/sections/SectionTitle';
import { DEGEN_BASE_API_URL } from 'constants/url';
import useFetch from 'hooks/useFetch';
import usePagination from 'hooks/usePagination';
import { DegenFilter } from 'types/degenFilter';
import { Degen } from 'types/degens';
import NetworkContext from 'contexts/NetworkContext';
import { v4 as uuidv4 } from 'uuid';
import DegenDialog from 'components/dialog/DegenDialog';
import BalanceContext from 'contexts/BalanceContext';
import DegensTopNav from 'components/extended/DegensTopNav';

// Needs to be divisible by 2, 3, or 4
const DEGENS_PER_PAGE = 12;

const AllRentalsPage = (): JSX.Element => {
  const { address } = useContext(NetworkContext);
  const [degens, setDegens] = useState<Degen[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [filters, setFilters] = useState<DegenFilter>(DEFAULT_STATIC_FILTER);
  const [defaultValues, setDefaultValues] = useState<DegenFilter | undefined>();
  const [filteredData, setFilteredData] = useState<Degen[]>([]);
  const [selectedDegen, setSelectedDegen] = useState<Degen>();
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] =
    useState<boolean>(false);
  const [isDegenModalOpen, setIsDegenModalOpen] = useState<boolean>(false);
  const [isRentDialog, setIsRentDialog] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [layoutMode, setLayoutMode] = useState<string>('gridView');

  const { data } = useFetch<{ [id: number]: Degen }>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );

  const { isDegenOwner } = useContext(BalanceContext);

  const theme = useTheme();
  const isScreenLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const { jump, dataForCurrentPage, maxPage, currentPage } = usePagination(
    filteredData,
    isScreenLg && layoutMode !== 'gridView' && !isDrawerOpen
      ? 15
      : DEGENS_PER_PAGE,
  );

  useEffect(() => {
    if (!data || !Object.values(data).length) {
      return;
    }

    const originalDegens: Degen[] = Object.values(data);
    setDefaultValues(getDefaultFilterValueFromData(originalDegens));
    // Filter out rent disabled degens in Feed
    setDegens(
      originalDegens.filter(
        (degen) => degen?.is_active || degen?.owner === address.toLowerCase(),
      ),
    );
    const params = Object.fromEntries(searchParams.entries());
    let newDegens = originalDegens;
    if (!isEmpty(params)) {
      if (params.searchTerm) setSearchTerm(params.searchTerm);
      const newFilterOptions = updateFilterValue(defaultValues, params);
      setFilters(newFilterOptions);
      newDegens = tranformDataByFilter(originalDegens, newFilterOptions);
    }

    setFilteredData(newDegens);

    return () => {
      setDegens([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmpty(data), address]);

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
      let result = tranformDataByFilter(degens, newFilters);
      setFilters(newFilters);
      setFilteredData(result);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [degens.length, filters.sort],
  );

  const handleSort = useCallback(
    (sort: string) => {
      const newSort = { ...filters, sort };
      setFilters(newSort);
      setFilteredData(tranformDataByFilter(degens, newSort));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [degens.length, filters],
  );

  const handleClickEditName = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRenameDegenModalOpen(true);
  }, []);

  const handleViewTraits = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRentDialog(false);
    setIsDegenModalOpen(true);
  }, []);

  const handleRentDegen = useCallback((degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRentDialog(true);
    setIsDegenModalOpen(true);
  }, []);

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
    () =>
      !isEmpty(defaultValues) && (
        <DegensFilter
          onFilter={handleFilter}
          defaultFilterValues={defaultValues as DegenFilter}
          isDegenOwner={isDegenOwner}
          searchTerm={searchTerm}
        />
      ),
    [defaultValues, isDegenOwner, handleFilter, searchTerm],
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
          size={isGridView ? 'normal' : 'small'}
          onClickEditName={() => handleClickEditName(degen)}
          onClickDetail={() => handleViewTraits(degen)}
          onClickRent={() => handleRentDegen(degen)}
        />
      </Grid>
    ),
    [
      handleClickEditName,
      handleRentDegen,
      handleViewTraits,
      isDrawerOpen,
      isGridView,
    ],
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
          {!degens?.length
            ? [...Array(8)].map(renderSkeletonItem)
            : dataForCurrentPage.map(renderDegen)}
        </Grid>
        <Pagination
          count={maxPage}
          page={currentPage}
          color="primary"
          sx={{ margin: '0 auto' }}
          onChange={(e: React.ChangeEvent<unknown>, p: number) => jump(p)}
        />
      </Stack>
    ),
    [
      isDrawerOpen,
      filteredData.length,
      degens?.length,
      renderSkeletonItem,
      dataForCurrentPage,
      renderDegen,
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
          // Filter drawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          renderDrawer={renderDrawer}
          // Main grid
          renderMain={renderMain}
        />
      </Stack>
      <DegenDialog
        open={isDegenModalOpen}
        degen={selectedDegen}
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
    </>
  );
};

export default AllRentalsPage;
