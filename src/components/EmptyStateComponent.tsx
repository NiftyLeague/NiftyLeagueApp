import React from 'react';
import { Button, Card, Typography } from '@mui/material';

interface EmptyStateComponentProps {
  message?: string;
  buttonCTA?: string;
}
const style = {
  position: 'relative' as 'relative',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #0F0',
  boxShadow: 24,
  p: 4,
};

const EmptyStateComponent: React.FC<EmptyStateComponentProps> = ({
  message,
  buttonCTA,
}) => (
  <div>
    <Card sx={style}>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {message}
      </Typography>
      <Button>{buttonCTA}</Button>
    </Card>
  </div>
);

export default EmptyStateComponent;
