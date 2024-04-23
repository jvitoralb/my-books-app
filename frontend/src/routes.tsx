import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import App from './App.tsx';
import HomePage from './pages/home/HomePage.tsx';
import WelcomePage from './pages/welcome/WelcomePage.tsx';
import LogInPage from './pages/login/LoginPage.tsx';
import SignUpPage from './pages/signup/SignupPage.tsx';
import SettingsPage from './pages/settings/SettingsPage.tsx';
import homeLoader from './pages/home/homeLoader.ts';
import settingsLoader from './pages/settings/settingsLoader.ts';
import ErrorPage from './pages/error/ErrorPage.tsx';


const browserAppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} loader={homeLoader} />
      <Route path='/settings' element={<SettingsPage />} loader={settingsLoader} />
      <Route path='/welcome' element={<WelcomePage />} />
      <Route path='/login' element={<LogInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
    </Route>
  )
);

export default browserAppRouter;