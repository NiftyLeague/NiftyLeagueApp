import { useContext, useEffect, useState } from 'react';
import {
  Stack,
  Typography,
  useTheme,
  Box,
  IconButton,
  Skeleton,
} from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import useCopyToClipboard from 'hooks/useCopyToClipboard';
import { ProfileTotal, Account } from 'types/account';
import { formatNumberToDisplay } from 'utils/numbers';

import ProgressGamer from './ProgressGamer';
import { GamerProfileContext } from '../index';
import ChangeProfileNameDialog from './ChangeProfileNameDialog';

interface TopInfoProps {
  total?: ProfileTotal;
  account: Account | undefined;
}

const TopInfo = ({ total, account }: TopInfoProps): JSX.Element => {
  const theme = useTheme();
  const [accountName, setAccountName] = useState<string>('Unknown');
  const { isLoadingProfile, isLoadingAccount } =
    useContext(GamerProfileContext);
  const [, copy] = useCopyToClipboard();
  const walletAddress = account?.address;

  useEffect(() => {
    if (account && account?.name_cased) {
      setAccountName(account.name_cased);
    }
  }, [account]);

  const handleUpdateNewName = (newName: string) => {
    setAccountName(newName);
  };

  const renderNameInfo = () => {
    if (isLoadingAccount) {
      return (
        <Skeleton
          sx={{ my: '5px ' }}
          variant="rectangular"
          width="50%"
          height="26px"
        />
      );
    }
    if (!isLoadingAccount && accountName) {
      return (
        <Typography variant="h2" component="div">
          {accountName}{' '}
          <ChangeProfileNameDialog handleUpdateNewName={handleUpdateNewName} />
        </Typography>
      );
    }
    return null;
  };

  const renderWalletAddress = () => {
    if (isLoadingAccount) {
      return (
        <Skeleton
          sx={{ my: '5px ' }}
          variant="rectangular"
          width="30%"
          height="26px"
        />
      );
    }
    if (!isLoadingAccount && walletAddress) {
      return (
        <>
          {`${walletAddress.slice(0, 5)}...${walletAddress.slice(
            walletAddress.length - 5,
            walletAddress.length - 1,
          )}`}{' '}
          <IconButton
            sx={{
              cursor: 'pointer',
            }}
            aria-label="copy"
            onClick={() => walletAddress && copy(walletAddress)}
          >
            <ContentCopyOutlinedIcon
              fontSize="small"
              sx={{
                color: theme.palette.grey[400],
              }}
            />
          </IconButton>
        </>
      );
    }
    return null;
  };

  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={5}>
        <Box width="50%">{renderNameInfo()}</Box>
        <Box width="50%">
          {isLoadingProfile && (
            <Skeleton variant="rectangular" width="100%" height="25px" />
          )}
          {!isLoadingProfile && total && <ProgressGamer total={total} />}
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={5}>
        <Typography
          width="50%"
          variant="h4"
          component="div"
          color={theme.palette.grey[400]}
        >
          {renderWalletAddress()}
        </Typography>
        <Typography width="50%" variant="h4" component="div">
          {isLoadingProfile ? (
            <Skeleton
              variant="rectangular"
              sx={{ display: 'inline-block' }}
              width="15%"
              height="19.76px"
            />
          ) : (
            `${formatNumberToDisplay(total?.xp || 0)}/${total?.rank_xp_next}`
          )}
          <Typography
            variant="h4"
            component="div"
            color={theme.palette.grey[400]}
            display="inline"
            ml="4px"
          >
            XP
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default TopInfo;
