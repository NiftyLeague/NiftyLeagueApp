import { memo, useCallback, useState } from 'react';
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

import { downloadDegenAsZip } from 'utils/file';
import { Degen, DegenViewType } from 'types/degens';

import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import DegenImage from './DegenImage';
import DegenTraits from 'components/degens/DegenTraits';
import DegenAddWhitelist from 'components/degens/DegenAddWhitelist';
import DegenRent from 'components/degens/DegenRent';
import DegenInGameEarning from 'components/degens/DegenInGameEarning';
import DegenClaim from 'components/degens/DegenClaim';

import { ReactComponent as NiffyIconBlack } from 'assets/images/icons/niffy-icon-black.svg';
import { ReactComponent as NiffyIconWhite } from 'assets/images/icons/niffy-icon-white.svg';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import ViewListIcon from '@mui/icons-material/ViewList';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export interface DegenCardProps {
  sx?: SxProps<Theme>;
  degen: Degen;
  isDashboardDegen?: boolean;
  isEnabled?: boolean;
  isFavorite?: boolean;
  onClaim?: React.MouseEventHandler<HTMLButtonElement>;
  onEditName?: React.MouseEventHandler<SVGSVGElement>;
  onEnableDisable?: React.MouseEventHandler<HTMLDivElement>;
  onOpenRentDialog?: React.MouseEventHandler<HTMLDivElement>;
  onOpenTraitsDialog?: React.MouseEventHandler<HTMLDivElement>;
  onOpenAddWhitelistDialog?: React.MouseEventHandler<HTMLDivElement>;
  onOpenInGameEarningDialog?: React.MouseEventHandler<HTMLDivElement>;
  onOpenClaimDialog?: React.MouseEventHandler<HTMLDivElement>;
}

const DegenCard: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<DegenCardProps>>
> = memo(
  ({
    sx,
    degen,
    isDashboardDegen = false,
    isFavorite,
    isEnabled,
    onEnableDisable,
    onOpenRentDialog,
    onOpenTraitsDialog,
    onOpenAddWhitelistDialog,
    onOpenInGameEarningDialog,
    onOpenClaimDialog,
  }): JSX.Element => {
    const authToken = window.localStorage.getItem('authentication-token');
    const { palette, customShadows } = useTheme();
    const [view, setView] = useState<DegenViewType>('default');

    const onClickDownload = async () => {
      if (authToken) {
        try {
          await downloadDegenAsZip(authToken, degen.id);
        } catch (err) {
          toast.error(err.message, { theme: 'dark' });
        }
      }
    };

    const handleReset = useCallback(() => {
      setView('default');
    }, []);

    const handleClickRent = useCallback(() => {
      setView('rent');
    }, []);

    const handleClickTraits = useCallback(() => {
      setView('traits');
    }, []);

    const handleClickAddWhiteList = useCallback(() => {
      setView('addWhiteList');
    }, []);

    const handleClickInGameEarning = useCallback(() => {
      setView('inGameEarning');
    }, []);

    const handleClickClaim = useCallback(() => {
      setView('claim');
    }, []);

    switch (view) {
      case 'rent':
        return (
          <DegenRent
            degen={degen}
            onBack={handleReset}
            onFullScreen={onOpenRentDialog}
          />
        );
      case 'traits':
        return (
          <DegenTraits
            degen={degen}
            onBack={handleReset}
            onFullScreen={onOpenTraitsDialog}
          />
        );
      case 'addWhiteList':
        return (
          <DegenAddWhitelist
            degen={degen}
            onBack={handleReset}
            onFullScreen={onOpenAddWhitelistDialog}
          />
        );
      case 'inGameEarning':
        return (
          <DegenInGameEarning
            degen={degen}
            onBack={handleReset}
            onFullScreen={onOpenInGameEarningDialog}
          />
        );
      case 'claim':
        return (
          <DegenClaim
            degen={degen}
            onBack={handleReset}
            onFullScreen={onOpenClaimDialog}
          />
        );
      case 'default':
      default:
        return (
          <Stack
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '4px',
              p: '12px',
              background: palette.background.paper,
              boxShadow: customShadows.xSmall,
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
              {isDashboardDegen ? (
                <HeaderDegens
                  isFavorite={isFavorite}
                  multiplier={degen.multiplier}
                  activeRentals={degen.rental_count}
                  onClickDownload={onClickDownload}
                />
              ) : (
                <HeaderDegenRentals
                  multiplier={degen.multiplier}
                  activeRentals={degen.rental_count}
                />
              )}
            </Stack>
            {/* Card Content */}
            <Stack gap={3}>
              {degen.id && <DegenImage tokenId={degen.id} />}
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="paragraphP2XSmall">
                  {degen.name || 'No Name DEGEN'}
                </Typography>
                <Link
                  href={
                    degen.id
                      ? `https://opensea.io/assets/0x986aea67c7d6a15036e18678065eb663fc5be883/${degen.id}`
                      : '#'
                  }
                  target="_blank"
                  rel="nofollow"
                  variant="paragraphXSmall"
                  color={palette.text.primary}
                >
                  {`#${degen.id}`}
                </Link>
              </Stack>
              <Button
                variant="contained"
                fullWidth
                sx={{ minWidth: '32%' }}
                onClick={handleClickRent}
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
              {isDashboardDegen ? (
                <FooterDegens
                  onEnableDisable={onEnableDisable}
                  isEnabled={isEnabled}
                  onViewTraits={handleClickTraits}
                  onViewAddWhiteList={handleClickAddWhiteList}
                  onViewInGameEarning={handleClickInGameEarning}
                  onViewClaim={handleClickClaim}
                />
              ) : (
                <FooterDegenRentals
                  price={degen.price}
                  onViewTraits={handleClickTraits}
                />
              )}
            </Stack>
          </Stack>
        );
    }
  },
);

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

const HeaderDegens = ({
  isFavorite,
  multiplier,
  activeRentals,
  onClickDownload,
}) => {
  return (
    <>
      <IconButton label="Favorite Degen">
        {isFavorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
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

const HeaderDegenRentals = ({ multiplier, activeRentals }) => {
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

const FooterDegenRentals = ({ price, onViewTraits }) => {
  const { palette } = useTheme();
  return (
    <>
      <IconButton label="Traits" onClick={onViewTraits}>
        <ViewListIcon />
      </IconButton>
      <Stack flex={1} flexDirection="row" justifyContent="space-between">
        <Link
          variant="paragraphXSmall"
          color={palette.text.primary}
          onClick={onViewTraits}
        >
          Traits
        </Link>
        <Typography variant="paragraphXSmall">{`${price} NFTL`}</Typography>
      </Stack>
    </>
  );
};

const FooterDegens = ({
  onEnableDisable,
  isEnabled,
  onViewTraits,
  onViewAddWhiteList,
  onViewInGameEarning,
  onViewClaim,
}) => {
  const { palette } = useTheme();
  return (
    <>
      <IconButton label="Traits" onClick={onViewTraits}>
        <ViewListIcon />
      </IconButton>
      <IconButton label="Game Earnings" onClick={onViewInGameEarning}>
        <AltRouteIcon />
      </IconButton>
      <IconButton onClick={onEnableDisable} label="Enable Rentals">
        {isEnabled ? (
          <LockOpenIcon sx={{ fill: palette.success.main }} />
        ) : (
          <LockIcon sx={{ fill: palette.success.main }} />
        )}
      </IconButton>
      <IconButton onClick={onViewAddWhiteList} label="Whitelist">
        <GroupAddIcon />
      </IconButton>
      <IconButton onClick={onViewClaim} label="Claim">
        {palette.mode === 'dark' ? <NiffyIconWhite /> : <NiffyIconBlack />}
      </IconButton>
    </>
  );
};

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
