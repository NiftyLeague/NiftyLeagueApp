import { IconButton, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface PaginationIconOnlyProps {
  hasNext?: boolean;
  hasPrev?: boolean;
  onClickPrev?: React.MouseEventHandler<HTMLButtonElement>;
  onClickNext?: React.MouseEventHandler<HTMLButtonElement>;
}

const PaginationIconOnly: React.FC<PaginationIconOnlyProps> = ({
  hasNext,
  hasPrev,
  onClickPrev,
  onClickNext,
}) => (
  <Stack direction="row" gap={1}>
    <IconButton size="small" disabled={hasPrev === false} onClick={onClickPrev}>
      <ArrowBackIosNewIcon fontSize="small" />
    </IconButton>
    <IconButton size="small" disabled={hasNext === false} onClick={onClickNext}>
      <ArrowForwardIosIcon fontSize="small" />
    </IconButton>
  </Stack>
);

export default PaginationIconOnly;