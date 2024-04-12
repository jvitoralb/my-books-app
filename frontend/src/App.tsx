import { Outlet, useNavigation } from 'react-router-dom';
import Header from './components/Header';
import LoadingDOM from './components/LoadingDOM';
import './styles/App.css';


function App() {
  const nav = useNavigation();

  return (
    <>
      <Header />
      {
        nav.state === 'loading' ? 
        <LoadingDOM /> : 
        <Outlet />
      }
    </>
  );
}

export default App;