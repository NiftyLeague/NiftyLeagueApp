import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { initGA, sendPageview } from 'utils/google-analytics';

const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    if ((window as any).ga) {
      sendPageview(currentPath);
    }
  }, [location]);
};

export default useGoogleAnalytics;
