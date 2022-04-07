import React, { useEffect, useState } from 'react';
import { Button, Card, Typography } from '@mui/material';

interface EmptyStateComponentProps {
  variant?: Variant;
}

type Variant = 'overview' | 'comics' | 'degen';

const ErrorMessages = {
  overview: {
    message: 'You do not own anything yet.',
    cta: 'Buy stuff',
  },
  comics: {
    message: 'You do not own any Comics yet.',
    cta: 'Buy Comics',
  },
  degen: {
    message: 'You do not own any DEGENs yet.',
    cta: 'Buy DEGENs',
  },
};

const style = {
  position: 'relative' as 'relative',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #0F0',
  boxShadow: 24,
  p: 4,
};

const EmptyStateComponent: React.FC<EmptyStateComponentProps> = ({
  variant,
}) => (
  <div>
    <Card sx={style}>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {variant === 'overview' && ErrorMessages.overview.message}
        {variant === 'degen' && ErrorMessages.degen.message}
        {variant === 'comics' && ErrorMessages.comics.message}
      </Typography>
      <Button>
        {variant === 'overview' && ErrorMessages.overview.cta}
        {variant === 'degen' && ErrorMessages.degen.cta}
        {variant === 'comics' && ErrorMessages.comics.cta}
      </Button>
    </Card>
  </div>
);

export default EmptyStateComponent;
