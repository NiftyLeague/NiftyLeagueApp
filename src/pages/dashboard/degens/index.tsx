import { Button, Grid, IconButton, Pagination, Stack } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import DegenCard from 'components/cards/DegenCard';
import DegensFilter from 'components/extended/DegensFilter/ index';
import CollapsibleSidebarLayout from 'components/layout/CollapsibleSidebarLayout';
import SectionTitle from 'components/sections/SectionTitle';
import degens from 'constants/degens';
import { useState } from 'react';
import { Degen } from 'types/degens';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SortButton from 'components/extended/SortButton';
import DegenSortOptions from 'constants/sort';

const DashboardDegensPage = (): JSX.Element => {
  const [_degens, setDegens] = useState<Degen[]>(degens);

  return (
    <CollapsibleSidebarLayout
      // Filter drawer
      renderDrawer={() => (
        <DegensFilter degens={_degens} setDegens={setDegens} />
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
              {_degens.length} Degens
            </Stack>
          </SectionTitle>
          {/* Main grid content */}
          <Grid container spacing={2}>
            {_degens.map((degen) => (
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
                  title={degen.title}
                  multiplier={degen.multiplier}
                  activeRentals={degen.activeRentals}
                  price={degen.price}
                  ownerId={degen.ownerId}
                  image={degen.image}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination count={10} color="primary" sx={{ margin: '0 auto' }} />
        </Stack>
      )}
    />
  );
};

export default DashboardDegensPage;
