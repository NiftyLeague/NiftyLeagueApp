import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        HELP
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Welcome to SATOSHI'S COMICs BURNING MACHINE! Here you can burn your
          COMICS for in-game WEARABLE ITEMS!
          <ul style={{ lineHeight: 2 }}>
            <li>
              First, if not already connected, connect your wallet with the
              CONNECT WALLET button at the top left of the machine.
            </li>
            <li>
              Each COMIC burned yields 1 WEARABLE ITEM. You can also get a
              CITADEL KEY by burning a FULL SET of COMICS 1-6.
            </li>
            <li>
              CONSOLE 1 shows you the amount of COMICS you currently own and
              allows you to select the comics you want to burn along with the
              counts.
            </li>
            <li>
              CONSOLE 2 shows you the total keys and items you will receive for
              burning.
            </li>
            <li>
              CONSOLE 3 is just some rad animations by our one and only spike!
              Watch Satoshi burn those comics when you click the burn button!
            </li>
            <li>
              When you are satisfied press the BURN FOR WEARABLE button on
              CONSOLE 4.
            </li>
            <li>
              An animation will play as SATOSHI transforms your COMICS into
              ITEMS or KEYS.
            </li>
            <li>
              Your new ITEMS are now in your IMX WALLET and will show in CONSOLE
              5.
            </li>
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
