import { useCallback, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSearchParams, useParams } from 'react-router-dom';

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
import defaultFilterValues from 'components/extended/DegensFilter/constants';
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
import DegenDialog from 'components/dialog/DegenDialog';

// Needs to be divisible by 2, 3, or 4
const DEGENS_PER_PAGE = 12;

const DegenRentalsPage = (): JSX.Element => {
  const [degens, setDegens] = useState<Degen[]>([]);
  const [filters, setFilters] = useState<DegenFilter>(defaultFilterValues);
  const [defaultValues, setDefaultValues] = useState<DegenFilter | {}>({});
  const [selectedDegen, setSelectedDegen] = useState<Degen>();
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] =
    useState<boolean>(false);
  const [isEnableDisableDegenModalOpen, setIsEnableDisableDegenModalOpen] =
    useState<boolean>(false);
  const [isDegenModalOpen, setIsDegenModalOpen] = useState<boolean>(false);
  const [isRentDialog, setIsRentDialog] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const { walletAddress } = useParams();

  const { data } = useFetch<{ [id: number]: Degen }>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );

  const { jump, updateNewData, currentData, newData, maxPage, currentPage } =
    usePagination(degens, DEGENS_PER_PAGE);

  const currentDataMemoized = useMemo(() => currentData(), [currentData]);

  useEffect(() => {
    if (data && !isEmpty(data)) {
      const originalDegens: Degen[] = Object.values(data);
      setDefaultValues(getDefaultFilterValueFromData(originalDegens));
      setDegens(originalDegens);
      const params = Object.fromEntries(searchParams.entries());
      let newDegens = originalDegens;
      if (!isEmpty(params)) {
        const newFilterOptions = updateFilterValue(params);
        setFilters(newFilterOptions);
        newDegens = tranformDataByFilter(originalDegens, newFilterOptions);
      }

      updateNewData(newDegens);
    }
    return () => {
      setDegens([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFilter = useCallback(
    (filter: DegenFilter) => {
      const newFilters = { ...filter, sort: filters.sort };
      let result = tranformDataByFilter(degens, newFilters);
      setFilters(newFilters);
      if (walletAddress) {
        result = result.filter(
          (degen) => degen.owner.toLowerCase() === walletAddress.toLowerCase(),
        );
      }
      updateNewData(result);
    },
    [degens, filters.sort, updateNewData, walletAddress],
  );

  const handleSort = useCallback(
    (sort: string) => {
      const newSort = { ...filters, sort };
      setFilters(newSort);
      updateNewData(tranformDataByFilter(degens, newSort));
    },
    [degens, filters, updateNewData],
  );

  // const handleClickCard = (degen: Degen): void => {
  //   setSelectedDegen(degen);
  //   setIsEnableDisableDegenModalOpen(true);
  // };

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

  return (
    <>
      <CollapsibleSidebarLayout
        // Filter drawer
        renderDrawer={() =>
          !isEmpty(defaultValues) && (
            <DegensFilter
              handleFilter={handleFilter}
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
                {newData.length} Degens
              </Stack>
            </SectionTitle>
            {/* Main grid content */}
            <Grid container spacing={2}>
              {!data
                ? [...Array(8)].map(() => (
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
                : currentDataMemoized.map((degen: Degen) => (
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
                        onClickEditName={() => handleClickEditName(degen)}
                        onClickDetail={() => handleViewTraits(degen)}
                        onClickRent={() => handleRentDegen(degen)}
                      />
                    </Grid>
                  ))}
            </Grid>
            <Pagination
              count={maxPage}
              page={currentPage}
              color="primary"
              sx={{ margin: '0 auto' }}
              onChange={(e: React.ChangeEvent<unknown>, p: number) => jump(p)}
            />
          </Stack>
        )}
      />
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

export default DegenRentalsPage;
