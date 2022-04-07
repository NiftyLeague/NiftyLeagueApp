import React from 'react';
import { Button, Card, Typography } from '@mui/material';

interface EmptyStateComponentProps {
  message?: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
  handleClick,
}) => (
  <div>
    <Card sx={style}>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {message}
      </Typography>
      <Button onClick={handleClick}>{buttonCTA}</Button>
    </Card>
  </div>
);

export default EmptyStateComponent;
