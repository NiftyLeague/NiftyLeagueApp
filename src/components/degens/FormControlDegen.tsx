import { FormControl as FormControlMUI } from '@mui/material';
import { useContext } from 'react';
import { DialogDegenContext } from 'components/dialog/DegenDialogV3';

const FormControlDegen = (props) => {
  const { isDialog } = useContext(DialogDegenContext);
  return (
    <FormControlMUI size={isDialog ? 'medium' : 'small'}>
      {props.children}
    </FormControlMUI>
  );
};

export default FormControlDegen;
