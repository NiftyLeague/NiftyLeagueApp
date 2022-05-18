import { Stack, Typography, useTheme, Box, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import useCopyToClipboard from 'hooks/useCopyToClipboard';
import ProgressGamer from './ProgressGamer';
import { ProfileTotal } from 'types/account';

interface TopInfoProps {
  total?: ProfileTotal;
}
const TopInfo = ({ total }: TopInfoProps): JSX.Element => {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, copy] = useCopyToClipboard();
  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={5}>
        <Typography width="50%" variant="h2" component="div">
          Unknown{' '}
          <IconButton
            sx={{
              cursor: 'pointer',
            }}
            aria-label="edit"
            onClick={() => null}
          >
            <EditOutlinedIcon
              fontSize="small"
              sx={{
                color: theme.palette.grey[400],
              }}
            />
          </IconButton>
        </Typography>
        <Box width="50%">{total && <ProgressGamer total={total} />}</Box>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={5}>
        <Typography
          width="50%"
          variant="h4"
          component="div"
          color={theme.palette.grey[400]}
        >
          0x2f...2Dad{' '}
          <IconButton
            sx={{
              cursor: 'pointer',
            }}
            aria-label="copy"
            onClick={() => copy('0x2f...2Dad')}
          >
            <ContentCopyOutlinedIcon
              fontSize="small"
              sx={{
                color: theme.palette.grey[400],
              }}
            />
          </IconButton>
        </Typography>
        <Typography width="50%" variant="h4" component="div">
          {total?.xp}/{total?.rank_xp_next}{' '}
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
