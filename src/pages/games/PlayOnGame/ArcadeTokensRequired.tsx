import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

const ArcadeTokensRequired: React.FC = () => {
  const handleBuyArcadeTokens = () => {
    // TODO: Integrate Buy Arcade Tokens here
  };

  return (
    <Grid container height="100%" alignItems="center" spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Typography variant="h1" component="div" textAlign="center">
              Arcade Tokens Required
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBuyArcadeTokens}
            >
              Buy Arcade Tokens
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ArcadeTokensRequired;
