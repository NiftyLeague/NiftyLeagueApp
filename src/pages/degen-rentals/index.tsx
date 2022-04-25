import { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Pagination, Stack } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import axios from 'utils/axios';
import { useSearchParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DegenCard from 'components/cards/DegenCard';
import DegensFilter from 'components/extended/DegensFilter';
import CollapsibleSidebarLayout from 'components/layout/CollapsibleSidebarLayout';
import SectionTitle from 'components/sections/SectionTitle';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import SortButton from 'components/extended/SortButton';
import DegenSortOptions from 'constants/sort';
import { Degen } from 'types/degens';
import usePagination from 'hooks/usePagination';
import tranformDataByFilter from 'components/extended/DegensFilter/ultils';
import { DEGEN_BASE_API_URL } from 'constants/url';
import { DegenFilter } from 'types/degenFilter';
import defaultFilterValues from 'components/extended/DegensFilter/constants';
import { backgrounds, tribes } from 'constants/filters';

const PER_PAGE: number = 8;

const DegenRentalsPage = (): JSX.Element => {
  const [degens, setDegens] = useState<Degen[]>([]);
  const [isFetchingDegens, setFetchingDegens] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const { jump, updateNewData, currentData, newData, maxPage, currentPage } =
    usePagination(degens, PER_PAGE);

  useEffect(() => {
    fetchDegens();
    return () => {
      setDegens([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDegens = async () => {
    try {
      const { data } = await axios.get(
        `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
      );
      const originalDegens: Degen[] = Object.values(data);
      setDegens(originalDegens);
      const params = Object.fromEntries(searchParams.entries());
      let newDegens = originalDegens;

      if (!isEmpty(params)) {
        const newFilter: DegenFilter = defaultFilterValues();
        if (params.prices && params.prices.split('-').length === 2) {
          newFilter.prices = params.prices.split('-').map(Number);
        }
        if (params.multipliers && params.multipliers.split('-').length === 2) {
          newFilter.multipliers = params.multipliers.split('-').map(Number);
        }
        if (params.rentals && params.rentals.split('-').length === 2) {
          newFilter.rentals = params.rentals.split('-').map(Number);
        }
        if (params.tribes && params.tribes.split('-').length <= tribes.length) {
          newFilter.tribes = params.tribes.split('-');
        }
        if (
          params.backgrounds &&
          params.backgrounds.split('-').length <= backgrounds.length
        ) {
          newFilter.backgrounds = params.backgrounds.split('-');
        }
        newDegens = tranformDataByFilter(originalDegens, newFilter);
      }

      updateNewData(newDegens);
      setFetchingDegens(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Can not get the rentables', error);
    }
  };

  const handleFilter = (filter: DegenFilter) => {
    const result = tranformDataByFilter(degens, filter);
    updateNewData(result);
  };

  return (
    <CollapsibleSidebarLayout
      // Filter drawer
      renderDrawer={() => <DegensFilter handleFilter={handleFilter} />}
      // Main grid
      renderMain={({ isDrawerOpen, setIsDrawerOpen }) => (
        <Stack gap={2}>
          {/* Main Grid title */}
          <SectionTitle
            firstSection
            actions={
              <SortButton sortOptions={DegenSortOptions}>
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
            {isFetchingDegens
              ? [...Array(8)].map(() => (
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
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
  );
};

export default DegenRentalsPage;
