import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import { IconUser } from '@tabler/icons';

export interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const { isLoggedIn } = useAuth();
  const { palette } = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor={palette.background.default}
      borderRadius={2}
      p={4}
      sx={{ border: `1px solid ${palette.grey[800]}` }}
    >
      <Avatar alt="avatar" sx={{ height: 80, width: 80 }}>
        <IconUser color={palette.grey[800]} height={40} width={40} />
      </Avatar>
      <Stack direction="column" alignItems="center" marginY={2}>
        <Typography variant="h4">Unkown</Typography>
        <Typography>0xunkown</Typography>
      </Stack>
      <Stack direction="column" alignItems="center" marginY={2}>
        <Typography variant="h4">{isLoggedIn ? '387' : '0'} NFTL</Typography>
        <Typography>Available to Claim</Typography>
      </Stack>
      {isLoggedIn ? (
        <Button variant="contained" fullWidth>
          Claim NFTL
        </Button>
      ) : (
        <Button variant="contained" fullWidth>
          Connect Wallet
        </Button>
      )}
    </Box>
  );
};

export default UserProfile;