import React, { useEffect, useState } from 'react';
import { Button, Card, Typography } from '@mui/material';

interface EmptyStateComponentProps {
  variant?: Variant;
}

type Variant = 'overview' | 'comics' | 'degen';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EmptyStateComponent: React.FC<EmptyStateComponentProps> = ({
  variant,
}) => (
  <div>
    <Card sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        No DEGENs
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        You do not own any DEGENs yet.
      </Typography>
      <Button>Buy a Degen</Button>
    </Card>
  </div>
);

export default EmptyStateComponent;
