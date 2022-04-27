// routing
import Routes from 'routes';

// project imports
import Locales from 'components/Locales';
import NavigationScroll from 'components/layout/NavigationScroll';
import Snackbar from 'components/extended/Snackbar';
import ThemeCustomization from 'themes';

// auth provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
import NetworkProvider from './NetworkProvider';

// ==============================|| APP ||============================== //

const App = () => (
  <ThemeCustomization>
    <Locales>
      <NavigationScroll>
        <NetworkProvider>
          <AuthProvider>
            <>
              <Routes />
              <Snackbar />
            </>
          </AuthProvider>
        </NetworkProvider>
      </NavigationScroll>
    </Locales>
  </ThemeCustomization>
);

export default App;
