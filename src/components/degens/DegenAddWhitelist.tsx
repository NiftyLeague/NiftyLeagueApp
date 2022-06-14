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
import ContentWithTwoLabels from './ContentWithTwoLabels';
import FormControlDegen from './FormControlDegen';

export interface DegenAddWhitelistProps {
  degen?: Degen;
  isDialog?: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  onBack?: React.MouseEventHandler<HTMLDivElement>;
  onFullScreen?: React.MouseEventHandler<HTMLDivElement>;
  onViewAll?: React.MouseEventHandler<HTMLAnchorElement> &
    React.MouseEventHandler<HTMLSpanElement>;
}

const DegenAddWhitelist = ({
  degen,
  isDialog,
  onClose,
  onBack,
  onFullScreen,
  onViewAll,
}: DegenAddWhitelistProps) => {
  const [loading] = useState<boolean>(false);
  const [agreement, setAgreement] = useState<boolean>(false);
  const [isWhitelist, setIsWhitelist] = useState<boolean>(false);

  useEffect(() => {
    sendEvent('whitelist', 'whitelist');
  }, []);

  return (
    <DegenContainer
      isDialog={isDialog}
      sx={{ minHeight: isDialog ? '572px' : '466px' }}
    >
      <HeaderDegen
        degen={degen}
        isDialog={isDialog}
        onBack={onBack}
        onFullScreen={onFullScreen}
        onClose={onClose}
      />
      <Stack flex={1} justifyContent="space-between">
        <Stack gap={6}>
          <Typography></Typography>
          <Stack>
            <Typography
              variant={isDialog ? 'paragraphSmall' : 'paragraphXXSmall'}
            >
              The whitelist feature automaticall disables public rentals,
              however, it allows you to add a list of trusted third-parties that
              will still be able rent and sponsor your degen. Turning this
              feature off removes all whitelisted addresses.
            </Typography>
          </Stack>
          <ContentWithTwoLabels
            firstText="Whitelist"
            secondText={
              <Stack gap={2} flexDirection="row" alignItems="center">
                <Typography
                  variant={isDialog ? 'formTextMedium' : 'formTextSmall'}
                >
                  {isWhitelist ? 'Yes' : 'No'}
                </Typography>
                <IOSSwitch
                  size={isDialog ? 'medium' : 'small'}
                  checked={Boolean(isWhitelist)}
                  onChange={() => setIsWhitelist(Boolean(!isWhitelist))}
                  inputProps={{ 'aria-label': 'controlled-direction' }}
                />
              </Stack>
            }
          />
          <FormControlDegen>
            <OutlinedInput
              multiline
              rows={3}
              placeholder="Enter a list of ETH wallet addresses you’d like to whitelist, one address per line."
            />
          </FormControlDegen>
          <Stack direction="row" justifyContent="center" paddingY={0.5}>
            <Link href="#" color="inherit" onClick={onViewAll}>
              <Typography
                variant={isDialog ? 'paragraphXSmall' : 'paragraphXXSmall'}
              >
                View & Edit All
              </Typography>
            </Link>
          </Stack>
          <FormControl>
            <FormControlLabel
              label={
                <Typography
                  variant={
                    isDialog ? 'termsConditionMedium' : 'termsConditionSmall'
                  }
                >
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
      </Stack>
    </DegenContainer>
  );
};

export default DegenAddWhitelist;
