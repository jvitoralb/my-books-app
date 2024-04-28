import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Header from './components/Header';
import LoadingDOM from './components/LoadingDOM';
import Footer from './components/Footer';


function App() {
  const nav = useNavigation();
  const location = useLocation();

  return (
    <>
      <Header
        location={location.pathname}
      />
      {
        nav.state === 'loading' ? 
        <LoadingDOM /> : 
        <Outlet />
      }
      <Footer
        location={location.pathname}
      />
    </>
  );
}

export default App;