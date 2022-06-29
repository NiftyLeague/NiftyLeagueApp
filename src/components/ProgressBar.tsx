import { Box, Typography, useTheme } from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  value: number;
  children: string | ReactNode;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, children }) => {
  const { palette } = useTheme();
  const centerTextRef = useRef<HTMLParagraphElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{
    left: number;
  }>({
    left: 0,
  });
  useEffect(() => {
    if (centerTextRef.current && progressContainerRef.current) {
      const textRect = centerTextRef.current.getBoundingClientRect();
      const containerRect =
        progressContainerRef.current.getBoundingClientRect();
      setRect({
        left: textRect.left - containerRect.left,
      });
    }
  }, [value]);
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          backgroundColor: palette.text.secondary,
          width: '100%',
          position: 'absolute',
          alignItems: 'center',
        }}
        borderRadius={3}
        height={16}
      >
        <Typography
          ref={centerTextRef}
          fontSize={8}
          sx={{
            position: 'absolute',
            left: `50%`,
            transform: `translateX(-50%)`,
            color: palette.primary.main,
            whiteSpace: 'nowrap',
          }}
        >
          {children}
        </Typography>
      </Box>
      <Box
        ref={progressContainerRef}
        sx={{
          width: `${value}%`,
          backgroundColor: palette.primary.main,
          overflow: 'hidden',
          zIndex: 1,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
        }}
        borderRadius={3}
        height={16}
      >
        <Typography
          fontSize={8}
          sx={{
            position: 'absolute',
            left: `${rect.left}px`,
            whiteSpace: 'nowrap',
          }}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
