import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PopUpCardProps {
  title?: string;
  content?: string;
  actions?: React.ReactNode;
}

const PopUpCard: React.FC<PopUpCardProps> = ({ title, content, actions }) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: theme.palette.dark[800],
          border: `1px solid${theme.palette.primary.main}`,
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ m: 2 }}>{content}</Typography>
        {actions}
      </Box>
    </Modal>
  );
};

export default PopUpCard;
