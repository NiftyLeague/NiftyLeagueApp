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
              First connect your wallet with the CONNECT WALLET button at the
              top left of the machine.
            </li>
            <li>
              Each COMIC burned yields 1 WEARABLE ITEM. You can also get a
              CITADEL KEY by burning a FULL SET of COMICS 1-6.
            </li>
            <li>CONSOLE 1 shows you the amount of COMICS you currently own.</li>
            <li>
              In CONSOLE 2 select the COMIC and the amount you would like to
              burn for WEARABLE ITEMS.
            </li>
            <li>
              In CONSOLE 3 on SATOSHI'S MONITOR you will see a preview of the
              WEARABLE ITEM and the AMOUNT of that ITEM you will receive.
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
