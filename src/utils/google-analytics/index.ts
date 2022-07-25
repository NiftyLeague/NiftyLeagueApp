import ReactGA from 'react-ga4';

const initGA = () => {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  if (isDev) {
    return;
  }

  const userId = window.localStorage.getItem('user-id');
  ReactGA.initialize(
    process.env.REACT_APP_GA_CONTAINER_ID || '',
    userId
      ? {
          gaOptions: {
            userId: userId,
          },
        }
      : undefined,
  );
};

const sendEvent = (action = '', category = '', label = '') => {
  if (category && action) {
    ReactGA.event(action, { category, label });
  }
};

const sendPageview = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

const sendUserId = (userId: string) => {
  window.localStorage.setItem('user-id', userId);
  ReactGA.set({ userId });
};

export { initGA, sendEvent, sendPageview, sendUserId };
