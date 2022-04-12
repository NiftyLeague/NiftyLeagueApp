import { IconButton, Stack } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import DegenCard from 'components/cards/DegenCard';
import DegensFilter from 'components/extended/DegensFilter/ index';
import CollapsibleSidebarLayout from 'components/layout/CollapsibleSidebarLayout';
import SectionTitle from 'components/sections/SectionTitle';
import degens from 'constants/degens';
import { useState } from 'react';
import { Degen } from 'types/degens';

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
        <>
          {/* Main Grid title */}
          <SectionTitle actions={<div>Sort by</div>}>
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
          <Stack direction="row" flexWrap="wrap" gap={4}>
            {_degens.map((degen) => (
              <DegenCard
                key={degen.title}
                id={degen.id}
                title={degen.title}
                multiplier={degen.multiplier}
                activeRentals={degen.activeRentals}
                price={degen.price}
                ownerId={degen.ownerId}
                image={degen.image}
              />
            ))}
          </Stack>
        </>
      )}
    />
  );
};

export default DashboardDegensPage;
