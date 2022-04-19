import { useContext } from 'react';
import {
  Dialog as DialogMUI,
  DialogContent as DialogContentMUI,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material';
import { DialogContext } from '.';
import { DialogProps } from 'types/dialog';
import { DialogDismissButton } from './DialogActions';
import CloseIcon from '@mui/icons-material/Close';

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  color: theme.palette.grey[500],
}));

const DialogContentBase = (props: DialogProps) => {
  const [isOpen, setIsOpen] = useContext(DialogContext);

  if (!isOpen) return null;
  return (
    <DialogMUI onClose={() => setIsOpen(false)} open={isOpen} {...props} />
  );
};

const DialogContent = ({
  dialogTitle,
  children,
  ...props
}: DialogProps): JSX.Element => (
  <DialogContentBase {...props}>
    <DialogTitle>
      {dialogTitle}
      <DialogDismissButton>
        <IconButtonStyle aria-label="close">
          <CloseIcon />
        </IconButtonStyle>
      </DialogDismissButton>
    </DialogTitle>
    <DialogContentMUI dividers>{children}</DialogContentMUI>
  </DialogContentBase>
);

export { DialogContent, DialogContentBase };
