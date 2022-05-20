import React from 'react';
import { Box, LinearProgress, useTheme } from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';

import { ProfileTotal } from 'types/account';

interface ProgressGamerProps {
  total: ProfileTotal;
}

const ProgressGamer = ({ total }: ProgressGamerProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          position: 'absolute',
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          right: '-6px',
          bottom: 0,
          margin: 'auto',
          background: theme.palette.primary.main,
          content: `'${
            total?.xp > total?.rank_xp_previous ? total?.rank + 1 : total?.rank
          }'`,
          zIndex: 1,
          fontWeight: 'bold',
          fontSize: '18px',
        },
      }}
    >
      <LinearProgress
        variant="determinate"
        color="primary"
        value={(total?.xp / total?.rank_xp_next) * 100}
        sx={{
          height: '25px',
          [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[400],
          },
        }}
      />
    </Box>
  );
};

export default ProgressGamer;
