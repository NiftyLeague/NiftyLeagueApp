import { useEffect, useState } from 'react';
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
  useMediaQuery,
} from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';

import DegenCard from 'components/cards/DegenCard';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import DegensFilter from 'components/extended/DegensFilter';
import defaultFilterValues from 'components/extended/DegensFilter/constants';
import {
  tranformDataByFilter,
  updateFilterValue,
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

const DashboardDegensPage = (): JSX.Element => {
  const [degens, setDegens] = useState<Degen[]>([]);
  const [filters, setFilters] = useState<DegenFilter>(defaultFilterValues);
  const [selectedDegen, setSelectedDegen] = useState<Degen>();
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] =
    useState<boolean>(false);
  const [isEnableDisableDegenModalOpen, setIsEnableDisableDegenModalOpen] =
    useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const { data } = useFetch<Degen[]>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );

  const isMobile = useMediaQuery('(min-width:600px)');
  const isTablet = useMediaQuery('(min-width:900px)');
  const isMediumScreen = useMediaQuery('(min-width:1200px)');
  const isLargeScreen = useMediaQuery('(min-width:1536px)');

  const getPageLimit = (): number => {
    if (isLargeScreen) {
      return 10;
    }
    if (isMediumScreen) {
      return 8;
    }
    if (isTablet) {
      return 6;
    }
    if (isMobile) {
      return 3;
    }
    return 2;
  };
  const PER_PAGE: number = getPageLimit();
  const { jump, updateNewData, currentData, newData, maxPage, currentPage } =
    usePagination(degens, PER_PAGE);

  useEffect(() => {
    if (data) {
      const originalDegens: Degen[] = Object.values(data);
      setDegens(originalDegens);
      const params = Object.fromEntries(searchParams.entries());
      let newDegens = originalDegens;
      if (!isEmpty(params)) {
        const newFilterOptions =
          updateFilterValue(params) || defaultFilterValues;
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

  const handleFilter = (filter: DegenFilter) => {
    const newFilters = { ...filter, sort: filters.sort };
    const result = tranformDataByFilter(degens, newFilters);
    setFilters(newFilters);
    updateNewData(result);
  };

  const handleSort = (sort: string) => {
    const newSort = { ...filters, sort };
    setFilters(newSort);
    updateNewData(tranformDataByFilter(degens, newSort));
  };

  const handleEnableDisable = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsEnableDisableDegenModalOpen(true);
  };

  const handleClickEditName = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRenameDegenModalOpen(true);
  };

  return (
    <>
      <CollapsibleSidebarLayout
        // Filter drawer
        renderDrawer={() => (
          <DegensFilter handleFilter={handleFilter} data={degens} />
        )}
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
                      md={6}
                      lg={6}
                      xl={2.4}
                      key={uuidv4()}
                    >
                      <SkeletonDegenPlaceholder />
                    </Grid>
                  ))
                : currentData().map((degen: Degen) => (
                    <Grid
                      key={degen.id}
                      item
                      xs={12}
                      sm={6}
                      md={isDrawerOpen ? 6 : 4}
                      lg={isDrawerOpen ? 6 : 4}
                      xl={2.4}
                    >
                      <DegenCard
                        id={degen.id}
                        name={degen.name}
                        multiplier={degen.multiplier}
                        owner={degen.owner}
                        price={degen.price}
                        background={degen.background}
                        activeRentals={degen.rental_count}
                        onEnableDisable={() => handleEnableDisable(degen)}
                        isDashboardDegen
                        onClickEditName={() => handleClickEditName(degen)}
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
      <Dialog
        open={isRenameDegenModalOpen}
        onClose={() => setIsRenameDegenModalOpen(false)}
      >
        <RenameDegenDialogContent
          degen={selectedDegen}
          onSuccess={() => setIsRenameDegenModalOpen(false)}
        />
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
