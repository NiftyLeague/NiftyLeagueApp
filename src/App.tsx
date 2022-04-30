// routing
import Routes from 'routes';

// project imports
import Locales from 'components/Locales';
import NavigationScroll from 'components/layout/NavigationScroll';
import Snackbar from 'components/extended/Snackbar';
import ThemeCustomization from 'themes';

// auth provider
import { TokenProvider as AuthProvider } from 'contexts/TokenContext';

// ==============================|| APP ||============================== //

const App = () => (
  <ThemeCustomization>
    <Locales>
      <NavigationScroll>
        <AuthProvider>
          <>
            <Routes />
            <Snackbar />
          </>
        </AuthProvider>
      </NavigationScroll>
    </Locales>
  </ThemeCustomization>
);

export default App;
