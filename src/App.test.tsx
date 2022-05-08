import { createRoot } from 'react-dom/client';

// routing
import Routes from 'routes';

// project imports
import Locales from 'components/Locales';
import NavigationScroll from 'components/layout/NavigationScroll';
import Snackbar from 'components/extended/Snackbar';

// auth provider
import { TokenProvider as AuthProvider } from 'contexts/TokenContext';
import NetworkProvider from 'NetworkProvider';

const App = () => (
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
);

export default App;

describe('🧪 Running test suite for App', () => {
  it('Renders without crashing', () => {
    const container = document.createElement('div');
    const root = createRoot(container!);
    root.render(<App />);
  });
});
