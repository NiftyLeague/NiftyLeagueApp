import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
} from '@mui/material';
import { Comic } from 'types/comic';
import { useTheme } from '@mui/material/styles';

export interface ViewComicDialogProps {
  comic?: Comic | null;
  open: boolean;
  onClose: () => void;
}

const ViewComicDialog = ({
  comic,
  open,
  onClose,
}: ViewComicDialogProps): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog maxWidth="lg" open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogContent>
        <img
          src={comic?.image}
          alt={comic?.title}
          style={{
            width: fullScreen ? '100%' : 500,
            height: 'auto',
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button fullWidth onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewComicDialog;
