import {
  Button,
  Dialog,
  Grid,
  IconButton,
  Pagination,
  Stack,
} from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import DegenCard from 'components/cards/DegenCard';
import DegensFilter from 'components/extended/DegensFilter';
import CollapsibleSidebarLayout from 'components/layout/CollapsibleSidebarLayout';
import SectionTitle from 'components/sections/SectionTitle';
import degens from 'constants/degens';
import { useState } from 'react';
import { Degen } from 'types/degens';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SortButton from 'components/extended/SortButton';
import DegenSortOptions from 'constants/sort';
import RenameDegenDialogContent from './dialogs/RenamDegenDialogContent';
import EnableDisableDegenDialogContent from './dialogs/EnableDegenDialogContent';

const DashboardDegensPage = (): JSX.Element => {
  const [_degens] = useState<Degen[]>(degens);
  const [selectedDegen, setSelectedDegen] = useState<Degen>();
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] =
    useState<boolean>(false);
  const [isEnableDisableDegenModalOpen, setIsEnableDisableDegenModalOpen] =
    useState<boolean>(false);

  const handleClickCard = (degen: Degen): void => {
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
        renderDrawer={() => <DegensFilter handleFilter={() => null} />}
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
                    name={degen.name}
                    multiplier={degen.multiplier}
                    owner={degen.owner}
                    price={degen.price}
                    background={degen.background}
                    activeRentals={degen.rental_count}
                    onClick={() => handleClickCard(degen)}
                    onClickEditName={() => handleClickEditName(degen)}
                  />
                </Grid>
              ))}
            </Grid>
            <Pagination count={10} color="primary" sx={{ margin: '0 auto' }} />
          </Stack>
        )}
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
        <EnableDisableDegenDialogContent degen={selectedDegen} isEnabled />
      </Dialog>
    </>
  );
};

export default DashboardDegensPage;
