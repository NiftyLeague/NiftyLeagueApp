import React from 'react';
import { Button, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface EmptyStateComponentProps {
  message?: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const EmptyStateComponent: React.FC<EmptyStateComponentProps> = ({
  message,
  buttonText,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <div>
      <Card
        sx={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: theme.palette.dark.dark,
          border: `1px solid${theme.palette.primary.main}`,
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography sx={{ mt: 2, color: 'white' }}>{message}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={onClick}>
          {buttonText}
        </Button>
      </Card>
    </div>
  );
};

export default EmptyStateComponent;
