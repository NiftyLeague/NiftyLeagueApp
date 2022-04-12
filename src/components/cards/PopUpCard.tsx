import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';

interface PopUpCardProps {
  title?: string;
  content?: string;
  uielement?: JSX.Element;
}

const PopUpCard: React.FC<PopUpCardProps> = ({ title, content, uielement }) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  return (
    <div>
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
          <Typography variant="h3">{title}</Typography>
          <Typography sx={{ m: 2 }}>{content}</Typography>
          {uielement}
        </Box>
      </Modal>
    </div>
  );
};

export default PopUpCard;
