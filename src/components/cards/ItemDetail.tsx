import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Item } from 'types/comic';
import ImageCard from 'components/cards/ImageCard';

export interface ItemDetailProps {
  data: Item | null;
  subIndex: number;
}

const ItemDetail: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<ItemDetailProps>>
> = ({ data, subIndex }) => {
  const navigate = useNavigate();
  const { enableEquip } = useFlags();

  if (!data || (data?.balance && data?.balance > 1 && subIndex < 0)) {
    return (
      <Box
        border="1px solid #363636"
        borderRadius="5px"
        minWidth={345}
        height={375}
      />
    );
  }

  const { equipped, image, multiplier, title, thumbnail } = data;

  const handleEquip = () => {
    navigate('/dashboard/degens');
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      border={{ xs: 'none', lg: '1px solid #363636' }}
      borderRadius="5px"
      minWidth={{ xs: '100%', lg: 345 }}
      width={345}
      height={375}
    >
      <Box position="relative" width={225} height={226}>
        <Box
          position="relative"
          overflow="hidden"
          sx={{ borderRadius: '10px 10px 0px 0px' }}
        >
          <ImageCard
            image={image}
            thumbnail={thumbnail}
            title={title}
            ratio={1}
          />
        </Box>
        {multiplier && multiplier >= 2 && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={50}
            height={50}
            position="absolute"
            borderRadius="50%"
            sx={{ background: '#5820D6', top: -12, right: -28 }}
          >
            <Typography
              color="#FFFFFF"
              fontSize="20px"
              fontWeight="bold"
            >{`${multiplier}x`}</Typography>
          </Box>
        )}
      </Box>
      {enableEquip ? (
        <Stack
          width={225}
          border="1px solid #5D5F74"
          borderTop="none"
          sx={{ borderRadius: '0px 0px 5px 5px' }}
          spacing={1.5}
          p={1}
          pb={3}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{ height: 28, textTransform: 'none', fontWeight: 700 }}
            onClick={handleEquip}
          >
            {equipped ? 'Unequip' : 'Equip on a DEGEN'}
          </Button>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="#363636" fontSize="12px" fontWeight={600}>
              Equipped:
            </Typography>
            <Typography
              color="#5820D6"
              fontSize="12px"
              fontWeight={500}
              sx={{ textDecorationLine: equipped ? 'underline' : 'none' }}
            >
              {equipped ? 'DEGEN #1152' : '-'}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="#363636" fontSize="12px" fontWeight={600}>
              Rental:
            </Typography>
            <Typography
              color="#5820D6"
              fontSize="12px"
              fontWeight={500}
              sx={{ textDecorationLine: equipped ? 'underline' : 'none' }}
            >
              {equipped ? '28 days left' : '-'}
            </Typography>
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default ItemDetail;