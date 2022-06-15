/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

import BgImage from 'assets/images/leadboard.jpg';
import WenLeaderBoardBG from 'assets/images/wen_leaderboard.png';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: '772px',
  height: '1024px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#181425',
  backgroundPosition: 'center',
};
interface ModalProps {
  ModalIcon: JSX.Element;
  child: JSX.Element;
  flag?: string;
}
const CustomModal = (props: ModalProps): JSX.Element | null => {
  const { ModalIcon, child, flag } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div onClick={handleOpen}>{ModalIcon}</div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box
          sx={{
            ...style,
            backgroundImage: `url(${
              flag === 'wen_game' ? WenLeaderBoardBG : BgImage
            })`,
          }}
        >
          {child}
        </Box>
      </StyledModal>
    </>
  );
};
export default CustomModal;
