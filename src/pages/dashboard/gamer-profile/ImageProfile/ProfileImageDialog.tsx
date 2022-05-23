import { useContext, useState, useEffect } from 'react';
import { IconButton, Box, Skeleton, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { toast } from 'react-toastify';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogContext,
} from 'components/dialog';
import SectionSlider from 'components/sections/SectionSlider';
import DegenImage from 'components/cards/DegenCard/DegenImage';
import SearchRental from 'pages/dashboard/rentals/SearchRental';

import { Rentals } from 'types/rentals';
import { useProfileAvatarFee } from 'hooks/useGamerProfile';
import { UPDATE_PROFILE_AVATAR_API } from 'constants/url';

interface ProfileImageDialogProps {
  rentals: Rentals[] | undefined;
  onChangeAvatar: (degenId: string) => void;
}

const settings = {
  className: 'center',
  slidesToShow: 4,
  rows: 2,
  slidesPerRow: 1,
  swipe: false,
};

const ProfileImageContent = ({ onSearch, onChangeAvatar, rentalsInternal }) => {
  const { fee, loadingFee } = useProfileAvatarFee();
  const [, setIsOpen] = useContext(DialogContext);

  const handleSelectedDegen = async (rental) => {
    const authToken = window.localStorage.getItem('authentication-token');
    if (!rental?.degen?.id && !authToken) {
      return;
    }
    try {
      const response = await fetch(UPDATE_PROFILE_AVATAR_API, {
        headers: { authorizationToken: authToken as string },
        method: 'POST',
        body: JSON.stringify({
          avatar: rental?.degen?.id,
        }),
      });
      if (!response.ok) {
        const errMsg = await response.text();
        toast.error(`Can not update the profile avatar: ${errMsg}`, {
          theme: 'dark',
        });
        return;
      }
      onChangeAvatar(rental?.degen?.id);
      setIsOpen(false);
      // onRenameRentalSuccess(res?.name_cased);
    } catch (error) {
      toast.error(`Can not update the profile avatar: ${error}`, {
        theme: 'dark',
      });
    }
  };

  const renderAvatarFee = () => {
    if (loadingFee) {
      return <Skeleton variant="rectangular" width="100%" height="37.34px" />;
    }
    if (!loadingFee && fee) {
      return (
        <Typography variant="h5" component="p">
          There is a {fee} NFTL fee for changing your gamer profile avatar
        </Typography>
      );
    }
    return null;
  };

  return (
    <SectionSlider
      sliderSettingsOverride={settings}
      firstSection
      title={
        <Stack flex={1} gap={1}>
          <Typography variant="h2">Choose a new profile degen</Typography>
          {renderAvatarFee()}
        </Stack>
      }
      actions={
        <SearchRental
          placeholder="Search degen by token # or name"
          handleSearch={onSearch}
        />
      }
    >
      {rentalsInternal.map((rental) => (
        <Box
          key={rental?.degen?.id}
          sx={{
            overflow: 'hidden',
            cursor: 'pointer',
            display: 'block !important',
            '&:hover img': {
              transform: 'scale(1.3)',
            },
            '& img': {
              transition: 'transform .5s ease',
            },
          }}
          onClick={() => handleSelectedDegen(rental)}
        >
          <DegenImage tokenId={rental?.degen?.id} />
        </Box>
      ))}
    </SectionSlider>
  );
};

const ProfileImageDialog = ({
  rentals,
  onChangeAvatar,
}: ProfileImageDialogProps): JSX.Element => {
  const [rentalsInternal, setRentalsInternal] = useState<Rentals[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (rentals) {
      setRentalsInternal(rentals);
    }
  }, [rentals]);

  const handleSearch = (currentValue: string) => {
    const newRental: any = rentals?.filter(
      (rental: any) =>
        rental?.accounts?.player?.address
          .toLowerCase()
          .includes(currentValue) ||
        rental?.degen?.id.toLowerCase().includes(currentValue) ||
        rental?.accounts?.player?.name.toLowerCase().includes(currentValue),
    );
    setRentalsInternal(newRental);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <IconButton
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            top: 1,
            left: 1,
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
      </DialogTrigger>
      <DialogContent
        aria-labelledby="profile-image-dialog"
        sx={{
          '& .MuiPaper-root': {
            maxWidth: '1000px',
          },
          '& .MuiDialogContent-root': {
            border: 'none',
          },
        }}
      >
        <ProfileImageContent
          onSearch={handleSearch}
          onChangeAvatar={onChangeAvatar}
          rentalsInternal={rentalsInternal}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageDialog;
