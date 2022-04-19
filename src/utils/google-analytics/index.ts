import ReactGA from 'react-ga';

const initGA = () => {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  if (isDev) return;
  ReactGA.initialize(process.env.REACT_APP_GA_CONTAINER_ID || '');
};

const sendEvent = (label = '', action = '', category = 'Commands') => {
  if (category && label && action) {
    ReactGA.event({ category, label, action });
  }
};

const sendPageview = (path: string) => {
  ReactGA.set({ page: path });
  ReactGA.pageview(path);
};

export { initGA, sendEvent, sendPageview };
