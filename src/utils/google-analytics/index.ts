import ReactGA from 'react-ga4';

const initGA = () => {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  if (isDev) {
    return;
  }

  ReactGA.initialize(process.env.REACT_APP_GA_CONTAINER_ID || '');
};

const sendEvent = (action = '', category = '', label = '') => {
  if (category && action) {
    ReactGA.event(action, { category, label });
  }
};

const sendPageview = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export { initGA, sendEvent, sendPageview };
