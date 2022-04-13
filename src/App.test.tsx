import ReactDOM from 'react-dom';

// routing
import Routes from 'routes';

// project imports
import Locales from 'components/Locales';
import NavigationScroll from 'components/layout/NavigationScroll';
import Snackbar from 'components/extended/Snackbar';

// auth provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';

const App = () => (
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
);

export default App;

describe('🧪 Running test suite for App', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
