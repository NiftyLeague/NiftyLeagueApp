import { Stack, Typography } from '@mui/material';

export interface SectionTitleProps {
  actions?: React.ReactNode;
  firstSection?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  firstSection,
  actions,
}) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    mb={2}
    mt={firstSection ? 0 : 4}
    gap={2}
    flexWrap="wrap"
  >
    <Typography variant="h2">{children}</Typography>
    {actions}
  </Stack>
);

export default SectionTitle;
