import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Header from './components/Header';
import LoadingDOM from './components/LoadingDOM';
import Footer from './components/Footer';
import useThemeMode from './hooks/useThemeMode';


function App() {
  const nav = useNavigation();
  const location = useLocation();
  const theme = useThemeMode();

  return (
    <>
      <Header
        location={location.pathname}
        theme={theme}
      />
      {
        nav.state === 'loading' ? 
        <LoadingDOM /> : 
        <Outlet context={{ theme }} />
      }
      <Footer
        location={location.pathname}
      />
    </>
  );
}

export default App;