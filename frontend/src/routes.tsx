import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import App from './App.tsx';
import HomePage from './pages/home/Home.tsx';
import homeLoader from './pages/home/home.loader.ts';
import Welcome from './pages/welcome/Welcome.tsx';
import LogInPage from './pages/login/Login.tsx';
import SignUpPage from './pages/signup/Signup.tsx';
import authLoader from './pages/loader/auth.ts';


const browserAppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<HomePage />} loader={homeLoader} />
      <Route path='/welcome' element={<Welcome />} loader={authLoader} />
      <Route path='/login' element={<LogInPage />} loader={authLoader} />
      <Route path='/signup' element={<SignUpPage />} loader={authLoader} />
    </Route>
  )
);

export default browserAppRouter;