import { useCallback, useContext, useEffect, useState } from 'react';
import { BigNumber, BigNumberish, utils } from 'ethers';
import {
  DialogContent,
  Stack,
  CardMedia,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';

import { Degen } from 'types/degens';
import NetworkContext from 'contexts/NetworkContext';
import { submitTxWithGasEstimate } from 'helpers/Notifier';
import { NFTL_CONTRACT, NFT_CONTRACT } from 'constants/contracts';
import BurnImg from 'assets/images/tribe/hydra-burn.png';
import { DEBUG } from 'constants/index';
import BurnTxStepper from './BurnTxStepper';

interface Props {
  selectedDegens: Degen[];
  incorrectDegenSelection: boolean;
  onSuccess?: () => void;
}

const BurnDegensDialog = ({
  selectedDegens,
  incorrectDegenSelection,
  onSuccess,
}: Props): JSX.Element => {
  const { address, tx, writeContracts } = useContext(NetworkContext);
  const [allowance, setAllowance] = useState<BigNumberish>(BigNumber.from('0'));
  const [claimSuccess, setClaimSuccess] = useState(false);
  const missingAllowance = allowance < 1000;

  useEffect(() => {
    const getAllowance = async () => {
      const degenContract = writeContracts[NFT_CONTRACT];
      const DEGENAddress = degenContract.address;
      const nftl = writeContracts[NFTL_CONTRACT];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const allowanceBN = (await nftl.allowance(
        address,
        DEGENAddress,
      )) as BigNumberish;
      setAllowance(allowanceBN);
    };
    setClaimSuccess(false);
    if (
      writeContracts &&
      writeContracts[NFTL_CONTRACT] &&
      writeContracts[NFT_CONTRACT]
    )
      // eslint-disable-next-line no-void
      void getAllowance();
  }, [address, writeContracts]);

  const handleRename = useCallback(async () => {
    if (
      writeContracts &&
      writeContracts[NFT_CONTRACT] &&
      writeContracts[NFTL_CONTRACT]
    ) {
      // eslint-disable-next-line no-console
      const degenContract = writeContracts[NFT_CONTRACT];
      const nftl = writeContracts[NFTL_CONTRACT];
      if (missingAllowance) {
        // eslint-disable-next-line no-console
        if (DEBUG) console.log('Current allowance too low');
        const DEGENAddress = degenContract.address;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await tx(
          nftl.increaseAllowance(DEGENAddress, utils.parseEther('100000')),
        );
        setAllowance(BigNumber.from('1000'));
      }
      // const args = [parseInt(degen?.id || '', 10), input];
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // const result = await submitTxWithGasEstimate(
      //   tx,
      //   degenContract,
      //   'changeName',
      //   args,
      // );
      // if (result) {
      //   setClaimSuccess(true);
      //   onSuccess?.();
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSuccess, missingAllowance, tx, writeContracts]);

  return (
    <>
      <DialogContent dividers sx={{ maxWidth: '820px', borderTop: 'none' }}>
        <Stack rowGap={2}>
          <Stack rowGap={1}>
            <CardMedia
              component="img"
              image={BurnImg}
              alt="degen"
              sx={{ width: '320px', margin: '0 auto' }}
            />
            <Typography
              variant="caption"
              component="p"
              sx={{ textAlign: 'center', color: 'red' }}
            >
              Once DEGENs pass through this portal there is no return...
            </Typography>
          </Stack>
          <BurnTxStepper
            missingAllowance={missingAllowance}
            claimSuccess={claimSuccess}
            incorrectDegenSelection={incorrectDegenSelection}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          onClick={handleRename}
          disabled={incorrectDegenSelection}
        >
          {missingAllowance
            ? 'Allow HydraDistributor contract to burn DEGENs'
            : 'Burn 8 DEGENs & Claim 1 HYDRA'}
        </Button>
      </DialogActions>
    </>
  );
};

export default BurnDegensDialog;
