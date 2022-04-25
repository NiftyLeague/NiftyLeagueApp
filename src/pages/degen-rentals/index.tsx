import { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Pagination, Stack } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import axios from 'utils/axios';
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
import { DEGEN_BASE_API_URL } from 'constants/url';

const PER_PAGE: number = 8;

const DegenRentalsPage = (): JSX.Element => {
  const [degens, setDegens] = useState<Degen[]>([]);
  const [isFetchingDegens, setFetchingDegens] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const count = Math.ceil(degens?.length / PER_PAGE);
  const newDegens = usePagination(degens, PER_PAGE);

  useEffect(() => {
    fetchDegens();
    return () => {
      setDegens([]);
    };
  }, []);

  const fetchDegens = async () => {
    try {
      const { data } = await axios.get(
        `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
      );
      setDegens(Object.values(data));
      setFetchingDegens(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Can not get the rentables', error);
    }
  };

  const handleChangePagination = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
    newDegens.jump(p);
  };

  return (
    <CollapsibleSidebarLayout
      // Filter drawer
      renderDrawer={() => (
        <DegensFilter degens={degens} setDegens={setDegens} />
      )}
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
              {degens.length} Degens
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
              : newDegens.currentData().map((degen: Degen) => (
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
            count={count}
            page={page}
            color="primary"
            sx={{ margin: '0 auto' }}
            onChange={handleChangePagination}
          />
        </Stack>
      )}
    />
  );
};

export default DegenRentalsPage;
