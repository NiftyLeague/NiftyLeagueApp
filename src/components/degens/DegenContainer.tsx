import { Stack, useTheme, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface DegenContainerProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const DegenContainer = ({ children, sx }: DegenContainerProps) => {
  const { palette, customShadows } = useTheme();
  return (
    <Stack
      gap={3}
      sx={{
        p: '12px',
        boxShadow: customShadows.xSmall,
        background: palette.background.paper,
        minHeight: '462px',
        position: 'relative',
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};

export default DegenContainer;
