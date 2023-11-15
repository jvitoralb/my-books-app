import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import App from './App.tsx';
import HomePage from './pages/home/HomePage.tsx';
import homeLoader from './pages/home/home.loader.ts';
import WelcomePage from './pages/welcome/WelcomePage.tsx';
import LogInPage from './pages/login/LoginPage.tsx';
import SignUpPage from './pages/signup/SignupPage.tsx';
import authLoader from './pages/loader/auth.ts';
import SettingsPage from './pages/settings/SettingsPage.tsx';
import settingsLoader from './pages/settings/settingsLoader.ts';


const browserAppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomePage />} loader={homeLoader} />
      <Route path='/settings' element={<SettingsPage />} loader={settingsLoader} />
      <Route path='/welcome' element={<WelcomePage />} loader={authLoader} />
      <Route path='/login' element={<LogInPage />} loader={authLoader} />
      <Route path='/signup' element={<SignUpPage />} loader={authLoader} />
    </Route>
  )
);

export default browserAppRouter;