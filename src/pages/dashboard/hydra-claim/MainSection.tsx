/* eslint-disable no-nested-ternary */
import { memo, useCallback, useContext } from 'react';
import { Box, Button, Grid, IconButton, Stack } from '@mui/material';
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Clear,
  Whatshot,
} from '@mui/icons-material';
import xor from 'lodash/xor';

import NetworkContext from 'contexts/NetworkContext';
import DegenCard from 'components/cards/DegenCard';
import DegenImage from 'components/cards/DegenCard/DegenImage';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import SectionTitle from 'components/sections/SectionTitle';
import { DEGEN_OPENSEA_URL } from 'constants/url';
import { Degen } from 'types/degens';
import { v4 as uuidv4 } from 'uuid';
import EmptyState from 'components/EmptyState';
import { DAO_BURN_ADDY } from 'constants/addresses';

const handleBuyDegen = () => {
  window.open(DEGEN_OPENSEA_URL, '_blank');
};

const DegensGrid = ({
  characters,
  filteredData,
  handleSelectDegen,
  isDrawerOpen,
  layoutMode,
  loading,
  selectedDegens,
}) => {
  const { address } = useContext(NetworkContext);
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
          isSelectableDegen
          isSelected={selectedDegens.includes(degen)}
          isSelectionDisabled={
            address.toLowerCase() !== DAO_BURN_ADDY.toLowerCase() &&
            selectedDegens.length === 8
          }
          onClickSelect={() => handleSelectDegen(degen)}
          size={isGridView ? 'normal' : 'small'}
        />
      </Grid>
    ),
    [address, isDrawerOpen, handleSelectDegen, isGridView, selectedDegens],
  );

  return (
    <Grid container spacing={2} mt={-4.5} mb={5}>
      {loading || !address ? (
        [...Array(12)].map(renderSkeletonItem)
      ) : filteredData.length ? (
        filteredData.map(renderDegen)
      ) : !characters?.length ? (
        <EmptyState
          message="No DEGENs found. Please check your address or go purchase a degen if you have not done so already!"
          buttonText="Buy some DEGENs"
          onClick={handleBuyDegen}
        />
      ) : null}
    </Grid>
  );
};

const DegensGridMemoized = memo(DegensGrid);

const DegenSelectionsBar = ({
  handleSelectDegen,
  incorrectDegenSelection,
  isDrawerOpen,
  selectedDegens,
  setBurnDialogOpen,
}) => {
  const renderDegenImage = useCallback(
    (degen: Degen) => (
      <Box
        key={degen.id}
        onClick={() => handleSelectDegen(degen)}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          '&:hover .MuiSvgIcon-root': { display: 'block' },
        }}
      >
        <DegenImage tokenId={degen.id} sx={{ height: 65, width: 65 }} />
        <Clear
          sx={{
            display: 'none',
            position: 'absolute',
            margin: 'auto',
            top: '15px',
            left: '15px',
            fontSize: '42px',
          }}
        />
      </Box>
    ),
    [handleSelectDegen],
  );
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 'auto',
        bottom: 0,
        height: 100,
        minWidth: `calc(100% - ${isDrawerOpen ? 732 : 386}px)`,
        backgroundColor: '#1E2023',
        border: '1px solid #d5d9e9',
        borderRadius: '15px 15px 0 0',
        zIndex: 1100,
        color: '#d5d9e9',
        boxShadow:
          '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        mx={2}
        height="100%"
      >
        <Stack direction="row" spacing={1} my={'auto'}>
          {selectedDegens.length ? selectedDegens.map(renderDegenImage) : null}
        </Stack>
        <Stack direction="column" gap={1} alignItems="center" width="25%">
          {`${selectedDegens.length} DEGENs Selected`}
          <Button
            onClick={() => setBurnDialogOpen(true)}
            variant="contained"
            fullWidth
            endIcon={<Whatshot />}
            disabled={incorrectDegenSelection}
          >
            {incorrectDegenSelection ? 'Select 8 DEGENs' : 'Burn'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

const MainSection = ({
  characters,
  filteredData,
  incorrectDegenSelection,
  isDrawerOpen,
  layoutMode,
  loading,
  selectedDegens,
  setBurnDialogOpen,
  setIsDrawerOpen,
  setSelectedDegens,
}) => {
  const handleSelectDegen = useCallback(
    (degen: Degen) => {
      // xor creates an array of unique values that is the symmetric difference of the given arrays
      const newSelectedDegens = xor(selectedDegens, [degen]);
      setSelectedDegens(newSelectedDegens);
    },
    [selectedDegens, setSelectedDegens],
  );

  return (
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
      <DegensGridMemoized
        characters={characters}
        filteredData={filteredData}
        handleSelectDegen={handleSelectDegen}
        isDrawerOpen={isDrawerOpen}
        layoutMode={layoutMode}
        loading={loading}
        selectedDegens={selectedDegens}
      />
      <DegenSelectionsBar
        handleSelectDegen={handleSelectDegen}
        incorrectDegenSelection={incorrectDegenSelection}
        isDrawerOpen={isDrawerOpen}
        selectedDegens={selectedDegens}
        setBurnDialogOpen={setBurnDialogOpen}
      />
    </Stack>
  );
};

export default memo(MainSection);
