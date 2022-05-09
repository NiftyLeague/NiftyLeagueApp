import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface EmptyStateProps {
  message?: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const EmptyState: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<EmptyStateProps>>
> = ({ message, buttonText, onClick }) => {
  const theme = useTheme();

  return (
    <>
      <Card
        sx={{
          mx: 'auto',
          width: 400,
          bgcolor: 'transparent',
          border: `1px solid${theme.palette.primary.main}`,
          boxShadow: 'none',
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography sx={{ mt: 2, color: 'white' }}>{message}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={onClick}>
          {buttonText}
        </Button>
      </Card>
    </>
  );
};

export default EmptyState;
