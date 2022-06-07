import {
  Button,
  Container,
  Dialog,
  DialogProps,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import TermsOfServiceContent from './TermsOfServiceContent';

export interface TermsOfServiceDialogProps extends DialogProps {
  onClose: (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown' | 'accepted' | 'cancel',
  ) => void;
}

const TermsOfServiceDialog = ({
  open,
  onClose,
  ...rest
}: TermsOfServiceDialogProps) => {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      maxWidth="sm"
      scroll="paper"
      fullScreen={fullScreen}
      onClose={onClose}
      open={open}
      {...rest}
    >
      <Stack overflow={'scroll'} direction="column" gap={1} width="100%">
        <TermsOfServiceContent />

        <Container>
          <Button
            fullWidth
            variant="contained"
            onClick={() => onClose({}, 'accepted')}
          >
            Accept
          </Button>
          <Button fullWidth onClick={() => onClose({}, 'cancel')}>
            Close
          </Button>
        </Container>
      </Stack>
    </Dialog>
  );
};

export default TermsOfServiceDialog;
