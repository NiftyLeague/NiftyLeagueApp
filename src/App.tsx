// routing
import Routes from 'routes';
import { withLDProvider } from 'launchdarkly-react-client-sdk';

// project imports
import Locales from 'components/Locales';
import NavigationScroll from 'components/layout/NavigationScroll';
import Snackbar from 'components/extended/Snackbar';
import ThemeCustomization from 'themes';

// auth provider
import { TokenProvider as AuthProvider } from 'contexts/TokenContext';
import { useEffect } from 'react';
import { WindowProvider } from 'contexts/WindowContext';
import { BalanceProvider } from 'contexts/BalanceContext';

// ==============================|| APP ||============================== //

const App = () => {
  useEffect(() => {
    window.addEventListener(
      'beforeunload',
      () => {
        localStorage.removeItem('active_rental');
      },
      false,
    );
  }, []);

  return (
    <ThemeCustomization>
      <Locales>
        <NavigationScroll>
          <AuthProvider>
            <WindowProvider>
              <BalanceProvider>
                <Routes />
                <Snackbar />
              </BalanceProvider>
            </WindowProvider>
          </AuthProvider>
        </NavigationScroll>
      </Locales>
    </ThemeCustomization>
  );
};

export default withLDProvider({
  clientSideID: process.env.REACT_APP_LAUNCHDARKLY_SDK_CLIENT!,
})(App);
