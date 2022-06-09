import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
  Input,
  FormHelperText,
  useTheme,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';

import { Degen } from 'types/degens';
import { sendEvent } from 'utils/google-analytics';

import HeaderDegen from './HeaderDegen';
import IOSSwitch from 'components/extended/IOSSwitch';
import DegenContainer from './DegenContainer';

export interface DegenInGameEarningProps {
  degen?: Degen;
  isDialog?: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  onBack?: React.MouseEventHandler<HTMLDivElement>;
  onFullScreen?: React.MouseEventHandler<HTMLDivElement>;
}

const DegenInGameEarning = ({
  degen,
  isDialog,
  onClose,
  onBack,
  onFullScreen,
}: DegenInGameEarningProps) => {
  const [loading] = useState<boolean>(false);
  const [agreement, setAgreement] = useState<boolean>(false);
  const [isCustomEarning, setIsCustomEarning] = useState<boolean>(false);
  const [owner, setOwner] = useState<number>();
  const [sponsor, setSponsor] = useState<number>();
  const [recruit, setRecruit] = useState<number>();
  const [customEarningError, setCustomEarningError] = useState<string>('');

  const { palette } = useTheme();

  useEffect(() => {
    sendEvent('InGameEarning', 'InGameEarning');
  }, []);

  const validatecustomEarning = (value: string) => {
    // TODO: WILL UPDATE THIS FUNCTION AFTER THE API IS READY
    setOwner(Number(value));
    setSponsor(Number(value));
    setRecruit(Number(value));
    setCustomEarningError('Error');
  };

  return (
    <DegenContainer>
      <HeaderDegen
        degen={degen}
        isDialog={isDialog}
        onBack={onBack}
        onFullScreen={onFullScreen}
        onClose={onClose}
      />
      <Stack flex={1} justifyContent="space-between">
        <Stack gap={isCustomEarning ? 6 : 11}>
          <Typography></Typography>
          <Stack gap={4}>
            <Typography variant="paragraphXXSmall">
              As the owner of this degen, you are able to set custom in-game
              earning splits for the Owner, Sponsor, and Recruits.
            </Typography>
            <Typography variant="paragraphXXSmall">
              The standard O/S/R split is 10% Owner, 50% Sponsor, 40% Recruit.
              Utilize the custom earning splits feature to make your degens more
              attractive to renters.
            </Typography>
          </Stack>
          <Stack gap={4}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="paragraphXXSmall" fontWeight="500">
                Custom Earning Splits
              </Typography>
              <Stack gap={2} flexDirection="row" alignItems="center">
                <Typography variant="labelIOSSwitch">
                  {isCustomEarning ? 'Yes' : 'No'}
                </Typography>
                <IOSSwitch
                  checked={Boolean(isCustomEarning)}
                  onChange={() => setIsCustomEarning(Boolean(!isCustomEarning))}
                  inputProps={{ 'aria-label': 'controlled-direction' }}
                />
              </Stack>
            </Stack>
            {isCustomEarning && (
              <Stack gap={9} justifyContent="space-between" flexDirection="row">
                <FormControl>
                  <Input
                    name="owner"
                    placeholder="Owner %"
                    type="number"
                    value={owner}
                    onChange={(event) =>
                      validatecustomEarning(event.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    name="sponsor"
                    placeholder="Sponsor %"
                    type="number"
                    value={sponsor}
                    onChange={(event) =>
                      validatecustomEarning(event.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <Input
                    name="recruit"
                    placeholder="Recruit %"
                    type="number"
                    value={recruit}
                    onChange={(event) =>
                      validatecustomEarning(event.target.value)
                    }
                  />
                </FormControl>
                {customEarningError && (
                  <FormHelperText sx={{ color: palette.error.main }}>
                    {customEarningError}
                  </FormHelperText>
                )}
              </Stack>
            )}
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
      </Stack>
    </DegenContainer>
  );
};

export default DegenInGameEarning;
