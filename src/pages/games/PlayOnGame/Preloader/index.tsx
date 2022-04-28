import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { isMobileOnly } from 'react-device-detect';
import { ReactComponent as PreloaderSVG } from 'assets/images/icons/preloader.svg';
import useStopwatch from 'hooks/useStopwatch';

export default function Preloader({
  ready,
  progress,
}: {
  ready: boolean;
  progress: number;
}): JSX.Element {
  const [percent, setPercent] = useState(progress);
  const { milliseconds, start, stop } = useStopwatch({ interval: 100 });

  useEffect(() => {
    if (!ready) start();
    return function cleanup() {
      stop();
    };
  }, [start, stop, ready]);

  useEffect(() => {
    if (progress !== 90) {
      setPercent(Math.round(progress));
    } else {
      const id = setInterval(() => {
        setPercent((p) => Math.round(p < 80 ? p + 10 : 90));
      }, 100);
      return () => clearInterval(id);
    }
    return undefined;
  }, [progress, stop]);

  useEffect(() => {
    const htmlElement = document.querySelector('html') as HTMLElement;
    if (!ready) {
      htmlElement.style.overflow = 'hidden';
    } else {
      htmlElement.style.overflow = 'auto';
      stop();
    }
    return function cleanup() {
      htmlElement.style.overflow = 'auto';
    };
  }, [ready, stop]);

  return (
    <div
      className="preloader-overlay"
      style={
        ready
          ? { transform: 'translateY(100%)' }
          : { transform: 'transform: translateY(0)' }
      }
    >
      <div id="js-preloader" className="preloader">
        <div className="preloader-inner fadeInUp">
          <div className="pong-loader" />
          <div className="pong-loader-left" />
          <div className="pong-loader-right" />
          <svg role="img" className="df-icon df-icon--preloader-arcade">
            <PreloaderSVG />
          </svg>
        </div>
      </div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            value={percent}
            color="success"
            variant="determinate"
            style={{ width: 160, marginLeft: 32 }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            percent,
          )}%`}</Typography>
        </Box>
      </Box>
      {isMobileOnly && milliseconds > 12000
        ? 'For the best experience try us out on desktop!'
        : null}
    </div>
  );
}
