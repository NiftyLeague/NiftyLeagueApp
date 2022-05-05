import React from 'react';
import { Alert } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  alertContainer: {
    zIndex: 1150,
    position: 'fixed',
    top: 25,
  },
}));

const ErrorModal = ({
  content,
  onClose,
}: {
  content: string;
  onClose: () => void;
}): JSX.Element | null => {
  const classes = useStyles();
  if (!content) {
    return null;
  }

  return (
    <div className={classes.alertContainer}>
      <Alert severity="error" onClose={onClose}>
        {content}
      </Alert>
    </div>
  );
};

export default ErrorModal;
