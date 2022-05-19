import { useContext } from 'react';
import { Box, IconButton, useTheme, Skeleton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import DegenImage from 'components/cards/DegenCard/DegenImage';

import { Rentals } from 'types/rentals';
import { GamerProfileContext } from './index';

interface ImageProfileProps {
  rental: Rentals | undefined;
}

const ImageProfile = ({ rental }: ImageProfileProps): JSX.Element => {
  const theme = useTheme();
  const { isLoadingComics } = useContext(GamerProfileContext);

  return (
    <Box
      sx={{
        '& img': {
          borderRadius: '8px',
        },
      }}
      position="relative"
    >
      {!isLoadingComics && rental?.degen_id && (
        <DegenImage tokenId={rental?.degen_id} />
      )}
      {isLoadingComics && (
        <Skeleton variant="rectangular" width="100%" height="320px" />
      )}
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
    </Box>
  );
};

export default ImageProfile;
