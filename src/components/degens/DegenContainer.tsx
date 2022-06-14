import { Stack, useTheme, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface DegenContainerProps {
  isDialog?: boolean;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const DegenContainer = ({ isDialog, children, sx }: DegenContainerProps) => {
  const { palette, customShadows } = useTheme();
  return (
    <Stack
      gap={3}
      sx={{
        p: isDialog ? '24px' : '12px',
        boxShadow: customShadows.xSmall,
        background: palette.background.paper,
        minHeight: isDialog ? '652px' : '466px',
        borderRadius: '4px',
        position: 'relative',
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};

export default DegenContainer;
