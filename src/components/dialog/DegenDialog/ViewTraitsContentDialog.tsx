import { Box, Button, Grid, Skeleton, Stack, Typography } from '@mui/material';
import DegenImage from 'components/cards/DegenCard/DegenImage';
import { TRAIT_NAME_MAP, TRAIT_VALUE_MAP } from 'constants/cosmeticsFilters';
import { CharacterType, Degen } from 'types/degens';
import { v4 as uuidv4 } from 'uuid';

export interface ViewTraitsContentDialogProps {
  degen?: Degen;
  character: CharacterType;
  traits: { [traitType: string]: number };
  displayName?: string;
  onRent: () => void;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ViewTraitsContentDialog = ({
  degen,
  character,
  traits,
  displayName,
  onRent,
  onClose,
}: ViewTraitsContentDialogProps) => {
  const { traitList } = character;

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} sx={{ py: 1, px: 2 }}>
        <Stack direction="row" justifyContent="center">
          {degen && <DegenImage tokenId={degen.id} />}
        </Stack>
        <Stack direction="column" alignItems="center" sx={{ my: 2 }}>
          {!traitList.length ? (
            <Skeleton width={120} animation="wave" />
          ) : (
            <Typography gutterBottom variant="h3">
              {displayName}
            </Typography>
          )}
          <Typography color="gray">#{degen?.id}</Typography>
        </Stack>
        <Stack direction="column" alignItems="center" sx={{ my: 2 }}>
          <Typography color="yellow">
            {degen?.multiplier}x Multiplier
          </Typography>
          <Typography color="green">
            {degen?.rental_count} Active Rentals
          </Typography>
          <Typography color="error">
            {degen?.earning_cap} NFTL/ 1 Week
          </Typography>
        </Stack>
        <Stack direction="column" alignItems="center" gap={1}>
          <Typography color="gray">
            Owned by {degen?.owner?.substring(0, 5)}
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        sx={{ py: 1, px: 2, position: 'relative' }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2">Degen Traits</Typography>
        </Box>
        <Grid container sx={{ marginTop: 3 }} gap={2}>
          {!traitList.length
            ? [...Array(9)].map(() => (
                <Grid item xs={3} key={uuidv4()}>
                  <Stack direction="column" alignItems="center">
                    <Skeleton animation="wave" width={60} />
                    <Skeleton animation="wave" width={40} />
                  </Stack>
                </Grid>
              ))
            : Object.entries(traits)
                .filter(
                  ([, value]) => parseInt(value as unknown as string, 10) > 0,
                )
                .map(([key, value]) => (
                  <Grid item xs={3} key={key}>
                    <Stack direction="column" alignItems="center">
                      <Typography fontWeight={700}>
                        {TRAIT_NAME_MAP[key]}
                      </Typography>
                      <Typography>{TRAIT_VALUE_MAP[value] ?? value}</Typography>
                    </Stack>
                  </Grid>
                ))}
        </Grid>
        <Stack
          direction="column"
          gap={1}
          width="100%"
          position="absolute"
          bottom={8}
          sx={{ width: '83%' }}
        >
          <Button variant="contained" fullWidth onClick={onRent}>
            Rent Degen
          </Button>
          <Button fullWidth onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ViewTraitsContentDialog;
