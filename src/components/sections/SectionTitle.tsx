import { Stack, Typography } from '@mui/material';

export interface SectionTitleProps {
  actions?: React.ReactNode;
  firstSection?: boolean;
}

const SectionTitle: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<SectionTitleProps>>
> = ({ children, firstSection, actions }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    mb={2}
    mt={firstSection ? 0 : 4}
    gap={2}
    flexWrap="wrap"
  >
    {typeof children === 'string' ? (
      <Typography variant="paragraphP2Small">{children}</Typography>
    ) : (
      children
    )}
    {actions}
  </Stack>
);

export default SectionTitle;
