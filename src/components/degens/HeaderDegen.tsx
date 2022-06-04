import {
  Divider,
  Stack,
  Typography,
  IconButton,
  Link,
  useTheme,
} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import DegenImage from 'components/cards/DegenCard/DegenImage';
import { Degen } from 'types/degens';

interface HeaderDegenProps {
  degen?: Degen;
  isDialog?: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  onBack?: React.MouseEventHandler<HTMLDivElement>;
  onFullScreen?: React.MouseEventHandler<HTMLDivElement>;
}

const HeaderDegen = ({
  degen,
  isDialog,
  onClose,
  onBack,
  onFullScreen,
}: HeaderDegenProps): JSX.Element => {
  const { palette } = useTheme();
  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap={3}
      >
        {!isDialog && (
          <IconButton
            color="inherit"
            aria-label="Back"
            component="div"
            sx={{
              p: 0,
            }}
            onClick={onBack}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        )}
        <Stack
          flexDirection="row"
          alignContent="flex-start"
          alignItems="center"
          flex={1}
          gap={2}
          sx={{
            '& img': {
              width: '24px',
            },
          }}
        >
          {degen?.id && <DegenImage imageHeight={24} tokenId={degen?.id} />}
          <Typography variant="paragraphP2XXXSmall">
            {degen?.name || 'No Name Degen'}
          </Typography>
        </Stack>
        <Link
          href={
            degen?.id
              ? `https://opensea.io/assets/0x986aea67c7d6a15036e18678065eb663fc5be883/${degen?.id}`
              : '#'
          }
          target="_blank"
          rel="nofollow"
          variant="paragraphXXSmall"
          color={palette.text.primary}
        >
          {`#${degen?.id}`}
        </Link>
        {isDialog ? (
          <IconButton
            color="inherit"
            aria-label="Fullscreen"
            component="div"
            sx={{
              p: 0,
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton
            color="inherit"
            aria-label="Fullscreen"
            component="div"
            sx={{
              p: 0,
            }}
            onClick={onFullScreen}
          >
            <OpenInFullIcon />
          </IconButton>
        )}
      </Stack>
      <Divider />
    </>
  );
};

export default HeaderDegen;
