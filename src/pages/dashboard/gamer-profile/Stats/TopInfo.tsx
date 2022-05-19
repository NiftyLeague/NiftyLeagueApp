import React, { useContext, useState } from 'react';
import {
  Stack,
  Typography,
  useTheme,
  Box,
  IconButton,
  Skeleton,
  TextField,
  Button,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import useCopyToClipboard from 'hooks/useCopyToClipboard';
import { ProfileTotal, Account } from 'types/account';

import ProgressGamer from './ProgressGamer';
import { GamerProfileContext } from '../index';

interface TopInfoProps {
  total?: ProfileTotal;
  account: Account | undefined;
  updateProfileName?: (name: string) => void;
}

interface IFormInput {
  name: string;
}

const validationSchema = yup.object({
  name: yup.string().required(),
});

const TopInfo = ({
  total,
  account,
  updateProfileName,
}: TopInfoProps): JSX.Element => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoadingRename, setIsLoadingRename] = useState<boolean>(false);
  const theme = useTheme();
  const { isLoadingProfile, isLoadingAccount } =
    useContext(GamerProfileContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, copy] = useCopyToClipboard();
  const walletAddress = account?.address;
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoadingRename(true);
    // setIsLoadingRename(false);
    onRenameProfileSuccess(data.name);
  };

  const handleCancel = () => {
    setIsEdit(false);
    reset();
  };

  const onRenameProfileSuccess = (newName: string) => {
    toast.success('The profile has been updated successful!', {
      theme: 'dark',
    });
    // updateProfileName(newName);
    handleCancel();
  };

  const renderNameInfo = () => {
    if (!isEdit) {
      return (
        <Typography variant="h2" component="div">
          {account?.name || 'Unknown'}{' '}
          <IconButton
            sx={{
              cursor: 'pointer',
            }}
            aria-label="edit"
            onClick={() => setIsEdit(true)}
          >
            <EditOutlinedIcon
              fontSize="small"
              sx={{
                color: theme.palette.grey[400],
              }}
            />
          </IconButton>
        </Typography>
      );
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" gap={1}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter the new name"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  '& input': {
                    padding: '8px 14px !important',
                  },
                }}
                disabled={isLoadingRename}
              />
            )}
          />
          <Stack direction="row" gap={1}>
            <Button
              disabled={!!errors.name}
              size="small"
              variant="contained"
              type="submit"
            >
              Save
            </Button>
            <Button variant="outlined" size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    );
  };

  const renderWalletAddress = () => {
    if (isLoadingAccount) {
      return <Skeleton variant="rectangular" width="30%" height="36px" />;
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
            <Skeleton variant="rectangular" width="40%" height="25px" />
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
            `${total?.xp}/${total?.rank_xp_next}`
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
