import { useState, createContext } from 'react';
import { DialogProps } from 'types/dialog';
import { DialogDismissButton, DialogTrigger } from './DialogActions';
import { DialogContent, DialogContentBase } from './DialogContent';

const defaultValue: any[] = [];

export const DialogContext = createContext(defaultValue);

const Dialog = (props: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return <DialogContext.Provider value={[isOpen, setIsOpen]} {...props} />;
};

export {
  DialogDismissButton,
  DialogTrigger,
  DialogContent,
  DialogContentBase,
  Dialog,
};
