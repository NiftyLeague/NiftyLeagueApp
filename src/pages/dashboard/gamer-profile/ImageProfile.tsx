import { Box, IconButton, useTheme } from '@mui/material';
import useAllRentals from 'hooks/useAllRentals';
import DegenImage from 'components/cards/DegenCard/DegenImage';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const ImageProfile = (): JSX.Element => {
  const theme = useTheme();
  const { rentals } = useAllRentals();
  return (
    <Box
      sx={{
        '& img': {
          borderRadius: '8px',
        },
      }}
      position="relative"
    >
      {rentals && rentals.length > 0 && rentals[0].degen_id && (
        <DegenImage tokenId={rentals[0].degen_id} />
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
