import React, { useContext, useState } from 'react';
import BalanceContext from 'contexts/BalanceContext';
import { Button, Stack, Typography } from '@mui/material';
import ErrorBoundary from 'components/ErrorBoundary';
import Preloader from 'components/Preloader';
import CharacterCreator from './components/CharacterCreator';
import { DEGEN_PURCHASE_URL } from 'constants/url';

const MintPage = () => {
  const { isDegenOwner } = useContext(BalanceContext);
  const [isLoaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBuyDegen = () => {
    window.open(DEGEN_PURCHASE_URL, '_blank');
  };

  if (!isDegenOwner) {
    return (
      <Stack
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" component="div" textAlign="center">
          This page is accessible to DEGEN owners only.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBuyDegen}
          sx={{ mt: 2 }}
        >
          Buy A DEGEN
        </Button>
      </Stack>
    );
  }

  return (
    <div style={{ textAlign: 'center', overflowX: 'hidden' }}>
      <ErrorBoundary>
        <Preloader ready={isLoaded} progress={progress} />
        <CharacterCreator
          isLoaded={isLoaded}
          setLoaded={setLoaded}
          setProgress={setProgress}
        />
      </ErrorBoundary>
    </div>
  );
};

export default MintPage;
