import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import Chip from 'components/extended/Chip';
import EditIcon from '@mui/icons-material/Edit';

const chipStyles = {
  color: 'white',
  borderRadius: 1,
  width: 'fit-content',
  fontSize: 11,
  fontWeight: 'bold',
  m: 0.5,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'auto',
  },
};

export interface DegenCardProps {
  id?: number;
  title?: string;
  multiplier?: number;
  activeRentals?: number;
  ownerId?: string;
  price?: number;
  image?: string;
  sx?: SxProps<Theme>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClickEditName?: React.MouseEventHandler<SVGSVGElement>;
  onClickRent?: React.MouseEventHandler<HTMLButtonElement>;
  onClickDetail?: React.MouseEventHandler<HTMLButtonElement>;
}

const DegenCard: React.FC<DegenCardProps> = ({
  id,
  title,
  multiplier,
  activeRentals,
  ownerId,
  price,
  image,
  sx,
  onClick,
  onClickEditName,
  onClickRent,
  onClickDetail,
}) => {
  const { palette } = useTheme();
  const [showEditName, setShowEditName] = useState(false);

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        border: `1px solid ${palette.grey[800]}`,
        ...sx,
      }}
      onClick={onClick}
    >
      <CardMedia component="img" height="200" image={image} alt={title} />
      <Stack
        direction="row"
        alignItems="flex-start"
        sx={{ display: 'flex', flexWrap: 'wrap', mt: 1, mb: 1, px: 1 }}
      >
        <Chip
          chipcolor="error"
          label={`${price} NFTL`}
          sx={chipStyles}
          variant="outlined"
          size="small"
        />
        <Chip
          chipcolor="success"
          label={`${activeRentals} rentals`}
          sx={chipStyles}
          variant="outlined"
          size="small"
        />
        <Chip
          chipcolor="warning"
          label={`${multiplier}x Multiplier`}
          sx={chipStyles}
          variant="outlined"
          size="small"
        />
      </Stack>
      <CardContent sx={{ paddingBottom: 0, paddingTop: 0 }}>
        <Stack
          direction="row"
          gap={1}
          onMouseEnter={() => setShowEditName(true)}
          onMouseLeave={() => setShowEditName(false)}
        >
          <Typography gutterBottom variant="h3">
            {title}
          </Typography>
          {showEditName && (
            <EditIcon sx={{ cursor: 'pointer' }} onClick={onClickEditName} />
          )}
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Link
            href="#"
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={palette.text.secondary}
            // underline props is not working
            sx={{ textDecoration: 'none' }}
          >
            {`Degen #${id}`}
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={palette.text.secondary}
            // underline props is not working
            sx={{ textDecoration: 'none' }}
          >
            {`Owned by #${ownerId}`}
          </Link>
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth sx={{ minWidth: 105 }}>
          Rent Degen
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ minWidth: 105 }}
        >
          View Traits
        </Button>
      </CardActions>
    </Card>
  );
};

export default DegenCard;
