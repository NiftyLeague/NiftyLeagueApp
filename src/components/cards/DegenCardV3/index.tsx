import { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Button,
  Link,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
  IconButton as IconButtonMui,
} from '@mui/material';
import { toast } from 'react-toastify';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import DegenImage from './DegenImage';
import { downloadDegenAsZip } from 'utils/file';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import ViewListIcon from '@mui/icons-material/ViewList';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { ReactComponent as NiffyIcon } from 'assets/images/icons/niffy-icon.svg';

export interface DegenCardProps {
  activeRentals?: number;
  id: string;
  isDashboardDegen?: boolean;
  isEnabled?: boolean;
  isFavorite?: boolean;
  multiplier?: number;
  name?: string;
  onClickClaim?: React.MouseEventHandler<HTMLButtonElement>;
  onClickDetail?: React.MouseEventHandler<HTMLButtonElement>;
  onClickEditName?: React.MouseEventHandler<SVGSVGElement>;
  onClickRent?: React.MouseEventHandler<HTMLButtonElement>;
  onEnableDisable?: React.MouseEventHandler<HTMLDivElement>;
  price?: number;
  sx?: SxProps<Theme>;
}

const IconButton = ({ label, children, ...rest }) => {
  return (
    <IconButtonMui
      {...rest}
      color="inherit"
      aria-label={label}
      component="div"
      sx={{ p: 0 }}
    >
      {children}
    </IconButtonMui>
  );
};

const DegenCard: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<DegenCardProps>>
> = memo(
  ({
    activeRentals,
    id,
    isDashboardDegen = false,
    isFavorite,
    isEnabled,
    multiplier,
    name,
    onClickClaim,
    onClickDetail,
    onClickEditName,
    onClickRent,
    onEnableDisable,
    price,
    sx,
  }) => {
    const { palette } = useTheme();

    const authToken = window.localStorage.getItem('authentication-token');
    const onClickDownload = async () => {
      if (authToken) {
        try {
          await downloadDegenAsZip(authToken, id);
        } catch (err) {
          toast.error(err.message, { theme: 'dark' });
        }
      }
    };

    const renderHeaderDegens = () => {
      return (
        <>
          <IconButton label="Favorite Degen">
            {isFavorite ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Typography
            variant="paragraphXSmall"
            fontWeight="500"
          >{`${multiplier}x`}</Typography>
          <Typography variant="paragraphXSmall" fontWeight="500">
            10/50/40
          </Typography>
          <Typography
            variant="paragraphXSmall"
            fontWeight="500"
          >{`${activeRentals}r`}</Typography>
          <IconButton onClick={onClickDownload} label="Download Degen">
            <DownloadIcon />
          </IconButton>
        </>
      );
    };

    const renderHeaderDegenRentals = () => {
      return (
        <>
          <Typography
            variant="paragraphXSmall"
            fontWeight="500"
          >{`${multiplier}x Multi`}</Typography>
          <Typography variant="paragraphXSmall" fontWeight="500">
            5/25/70
          </Typography>
          <Typography
            variant="paragraphXSmall"
            fontWeight="500"
          >{`${activeRentals} Rentals`}</Typography>
        </>
      );
    };

    const renderFooterDegenRentals = () => {
      return (
        <>
          <IconButton label="Traits">
            <ViewListIcon />
          </IconButton>
          <Stack flex={1} flexDirection="row" justifyContent="space-between">
            <Link variant="paragraphXSmall">Traits</Link>
            <Typography variant="paragraphXSmall">{`${price} NFTL`}</Typography>
          </Stack>
        </>
      );
    };

    const renderFooterDegens = () => {
      return (
        <>
          <IconButton label="Traits">
            <ViewListIcon />
          </IconButton>
          <IconButton label="Game Earnings">
            <AltRouteIcon />
          </IconButton>
          <IconButton onClick={onEnableDisable} label="Enable Rentals">
            {isEnabled ? (
              <LockOpenIcon color="success" />
            ) : (
              <LockIcon color="error" />
            )}
          </IconButton>
          <IconButton label="Whitelist">
            <GroupAddIcon />
          </IconButton>
          <IconButton label="Niffy">
            <NiffyIcon />
          </IconButton>
        </>
      );
    };

    return (
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          border: `1px solid ${palette.grey[800]}`,
          borderRadius: '4px',
          backgroundColor: palette.background.default,
          p: '12px',
          // TOTO: Will update the color and boxshadow after the palate color updating
          background: '#FAFAFA',
          boxShadow: '0px 1px 2px rgba(25, 27, 31, 0.05)',
          ...sx,
        }}
        gap={3}
      >
        {/* Card Header */}
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {isDashboardDegen ? renderHeaderDegens() : renderHeaderDegenRentals()}
        </Stack>
        {/* Card Content */}
        <Stack gap={3}>
          {id && <DegenImage tokenId={id} />}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="paragraphP2XSmall">
              {name || 'No Name DEGEN'}
            </Typography>
            <Link
              href={
                id
                  ? `https://opensea.io/assets/0x986aea67c7d6a15036e18678065eb663fc5be883/${id}`
                  : '#'
              }
              target="_blank"
              rel="nofollow"
              variant="paragraphXSmall"
            >
              {`#${id}`}
            </Link>
          </Stack>
          <Button
            variant="contained"
            fullWidth
            sx={{ minWidth: '32%' }}
            onClick={onClickRent}
          >
            Rent
          </Button>
        </Stack>
        {/* Card Footer */}
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          {isDashboardDegen ? renderFooterDegens() : renderFooterDegenRentals()}
        </Stack>
      </Stack>
    );
  },
);

const DegenCardInView: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<DegenCardProps>>
> = (props) => {
  const { ref, inView } = useInView();

  return (
    <div ref={ref}>
      {inView ? <DegenCard {...props} /> : <SkeletonDegenPlaceholder />}
    </div>
  );
};

export { DegenCardInView };

export default DegenCard;
