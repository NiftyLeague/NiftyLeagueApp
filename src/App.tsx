// routing
import Routes from 'routes';

// project imports
import Locales from 'components/Locales';
import NavigationScroll from 'components/layout/NavigationScroll';
import Snackbar from 'components/extended/Snackbar';
import ThemeCustomization from 'themes';

// auth provider
import { TokenProvider as AuthProvider } from 'contexts/TokenContext';
import { WindowProvider } from 'contexts/WindowContext';
import { BalanceProvider } from 'contexts/BalanceContext';
import { FeatureFlagProvider } from 'contexts/FeatureFlagsContext';

// ==============================|| APP ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
      <Locales>
        <NavigationScroll>
          <AuthProvider>
            <WindowProvider>
              <BalanceProvider>
                <FeatureFlagProvider>
                  <Routes />
                  <Snackbar />
                </FeatureFlagProvider>
              </BalanceProvider>
            </WindowProvider>
          </AuthProvider>
        </NavigationScroll>
      </Locales>
    </ThemeCustomization>
  );
};

export default App;
