import { useContext, useState, useEffect } from 'react';
import { IconButton, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogContext,
} from 'components/dialog';
import SectionSlider from 'components/sections/SectionSlider';
import DegenImage from 'components/cards/DegenCard/DegenImage';

import { Rentals } from 'types/rentals';
import SearchRental from 'pages/dashboard/rentals/SearchRental';

interface ProfileImageDialogProps {
  rentals: Rentals[] | undefined;
}

const settings = {
  className: 'center',
  slidesToShow: 4,
  rows: 2,
  slidesPerRow: 1,
  swipe: false,
};

const ProfileImageContent = ({ handleSearch, rentalsInternal }) => {
  const [, setIsOpen] = useContext(DialogContext);

  const handleSelectedDegen = (rental) => {
    // TODO: Waiting the api to update profile image.
    setIsOpen(false);
  };

  return (
    <SectionSlider
      sliderSettingsOverride={settings}
      firstSection
      title="Choose a new profile degen"
      actions={
        <SearchRental
          placeholder="Search degen by token # or name"
          handleSearch={handleSearch}
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
          handleSearch={handleSearch}
          rentalsInternal={rentalsInternal}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageDialog;
