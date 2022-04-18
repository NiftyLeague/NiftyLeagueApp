import React, {
  useState,
  createContext,
  useContext,
  cloneElement,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  SxProps,
  IconButton,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { callAll } from 'utils';

interface AuxProps {
  children?: React.ReactNode;
}
interface DialogGlobal extends AuxProps {
  dialogTitle?: React.ReactNode | string;
  sx?: SxProps<{}>;
}

interface DialogButton {
  children: React.ReactElement;
}

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  color: theme.palette.grey[500],
}));

const defaultValue: any[] = [];

export const DialogContext = createContext(defaultValue);

const DialogWrapper = (props: DialogGlobal) => {
  const [isOpen, setIsOpen] = useState(false);
  return <DialogContext.Provider value={[isOpen, setIsOpen]} {...props} />;
};

const DialogDismissButton = ({ children }: DialogButton) => {
  const [, setIsOpen] = useContext(DialogContext);
  return cloneElement(children, {
    onClick: callAll(() => setIsOpen(false), children.props.onClick),
  });
};

const DialogOpenButton = ({ children }: DialogButton) => {
  const [, setIsOpen] = useContext(DialogContext);
  return cloneElement(children, {
    onClick: callAll(() => setIsOpen(true), children.props.onClick),
  });
};

const DialogContentsBase = (props: DialogGlobal) => {
  const [isOpen, setIsOpen] = useContext(DialogContext);

  if (!isOpen) return null;
  return <Dialog onClose={() => setIsOpen(false)} open={isOpen} {...props} />;
};

const DialogContents = ({
  dialogTitle,
  children,
  ...props
}: DialogGlobal): JSX.Element => (
  <DialogContentsBase {...props}>
    <DialogTitle>
      {dialogTitle}
      <DialogDismissButton>
        <IconButtonStyle aria-label="close">
          <CloseIcon />
        </IconButtonStyle>
      </DialogDismissButton>
    </DialogTitle>
    <DialogContent dividers>{children}</DialogContent>
  </DialogContentsBase>
);

export {
  DialogDismissButton,
  DialogOpenButton,
  DialogContents,
  DialogContentsBase,
  DialogWrapper,
};
