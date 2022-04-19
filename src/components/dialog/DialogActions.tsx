import { useContext, cloneElement } from 'react';
import { DialogContext } from '.';
import { DialogAction } from 'types/dialog';
import { callAll } from 'utils';

const DialogActionComp = ({ children, isOpen }: DialogAction) => {
  const [, setIsOpen] = useContext(DialogContext);
  return cloneElement(children, {
    onClick: callAll(() => setIsOpen(isOpen), children.props.onClick),
  });
};

const DialogTrigger = ({ children }: DialogAction) =>
  DialogActionComp({ children, isOpen: true });

const DialogDismissButton = ({ children }: DialogAction) =>
  DialogActionComp({ children, isOpen: false });

export { DialogTrigger, DialogDismissButton };
