import { useCallback, useContext, useEffect, useState } from 'react';
import {
  DialogContent,
  Stack,
  CardMedia,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';
import { BigNumber } from 'ethers';

import { Degen } from 'types/degens';
import NetworkContext from 'contexts/NetworkContext';
import { submitTxWithGasEstimate } from 'helpers/Notifier';
import { HYDRA_DISTRIBUTOR, DEGEN_CONTRACT } from 'constants/contracts';
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
  const [approvedForAll, setApprovedForAll] = useState<boolean>(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  useEffect(() => {
    const getApprovals = async () => {
      const DegenContract = writeContracts[DEGEN_CONTRACT];
      const HydraDistributor = writeContracts[HYDRA_DISTRIBUTOR];
      const contractAddress = HydraDistributor.address;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const approved = (await DegenContract.isApprovedForAll(
        address,
        contractAddress,
      )) as boolean;
      setApprovedForAll(approved);
    };
    setClaimSuccess(false);
    if (
      writeContracts &&
      writeContracts[HYDRA_DISTRIBUTOR] &&
      writeContracts[DEGEN_CONTRACT]
    )
      void getApprovals();
  }, [address, writeContracts]);

  const handleClaim = useCallback(async () => {
    if (
      writeContracts &&
      writeContracts[DEGEN_CONTRACT] &&
      writeContracts[HYDRA_DISTRIBUTOR]
    ) {
      // eslint-disable-next-line no-console
      const DegenContract = writeContracts[DEGEN_CONTRACT];
      const HydraDistributor = writeContracts[HYDRA_DISTRIBUTOR];
      const contractAddress = HydraDistributor.address;
      if (!approvedForAll) {
        // eslint-disable-next-line no-console
        if (DEBUG) console.log('Contract not approved yet');
        await tx(DegenContract.setApprovalForAll(contractAddress, true));
        setApprovedForAll(true);
      }
      const args = [selectedDegens.map((degen) => BigNumber.from(degen.id))];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await submitTxWithGasEstimate(
        tx,
        HydraDistributor,
        'claimRandomHydra',
        args,
      );
      if (result) {
        setClaimSuccess(true);
        onSuccess?.();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSuccess, approvedForAll, tx, writeContracts]);

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
            approvedForAll={approvedForAll}
            claimSuccess={claimSuccess}
            incorrectDegenSelection={incorrectDegenSelection}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          onClick={handleClaim}
          disabled={incorrectDegenSelection}
        >
          {!approvedForAll
            ? 'Allow HydraDistributor contract to burn DEGENs'
            : 'Burn 8 DEGENs & Claim 1 HYDRA'}
        </Button>
      </DialogActions>
    </>
  );
};

export default BurnDegensDialog;
