import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';

import { Degen } from 'types/degens';
import { sendEvent } from 'utils/google-analytics';

import HeaderDegen from './HeaderDegen';
import IOSSwitch from 'components/extended/IOSSwitch';
import DegenContainer from './DegenContainer';

export interface DegenWhitelistProps {
  degen?: Degen;
  isDialog?: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  onBack?: React.MouseEventHandler<HTMLDivElement>;
  onFullScreen?: React.MouseEventHandler<HTMLDivElement>;
  onViewAll?: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLSpanElement>;
}

const DegenWhitelist = ({
  degen,
  isDialog,
  onClose,
  onBack,
  onFullScreen,
  onViewAll,
}: DegenWhitelistProps) => {
  const [loading] = useState<boolean>(false);
  const [agreement, setAgreement] = useState<boolean>(false);
  const [isWhitelist, setIsWhitelist] = useState<boolean>(false);

  useEffect(() => {
    sendEvent('whitelist', 'whitelist');
  }, []);

  return (
    <DegenContainer>
      <HeaderDegen
        degen={degen}
        isDialog={isDialog}
        onBack={onBack}
        onFullScreen={onFullScreen}
        onClose={onClose}
      />
      <Stack gap={4}>
        <Stack>
          <Typography variant="paragraphXXSmall">
            The whitelist feature automaticall disables public rentals, however,
            it allows you to add a list of trusted third-parties that will still
            be able rent and sponsor your degen. Turning this feature off
            removes all whitelisted addresses.
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="paragraphXXSmall" fontWeight="500">
            Whitelist
          </Typography>
          <Stack gap={2} flexDirection="row" alignItems="center">
            <Typography variant="labelIOSSwitch">
              {isWhitelist ? 'Yes' : 'No'}
            </Typography>
            <IOSSwitch
              checked={Boolean(isWhitelist)}
              onChange={() => setIsWhitelist(Boolean(!isWhitelist))}
              inputProps={{ 'aria-label': 'controlled-direction' }}
            />
          </Stack>
        </Stack>
        <FormControl>
          <OutlinedInput
            multiline
            rows={3}
            placeholder="Enter a list of ETH wallet addresses you’d like to whitelist, one address per line."
          />
        </FormControl>
        <Stack direction="row" justifyContent="center" paddingY={0.5}>
          <Link href="#" color="inherit" onClick={onViewAll}>
            <Typography variant="paragraphXXSmall">View & Edit All</Typography>
          </Link>
        </Stack>
        <FormControl>
          <FormControlLabel
            label={
              <Typography variant="termsCondition">
                I accept and understand the above terms, conditions, and
                information.
              </Typography>
            }
            control={
              <Checkbox
                value={agreement}
                onChange={(event) => setAgreement(event.target.checked)}
              />
            }
          />
        </FormControl>
      </Stack>
      <LoadingButton
        variant="contained"
        fullWidth
        disabled={!agreement}
        loading={loading}
      >
        {!agreement ? 'Accept Terms to Continue' : 'Confirm'}
      </LoadingButton>
    </DegenContainer>
  );
};

export default DegenWhitelist;
