import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import App from './App.tsx';
import Home from './pages/home/Home.tsx';
import homeLoader from './pages/home/home.loader.ts';
import Welcome from './pages/welcome/Welcome.tsx';
import LogInPage from './pages/login/Login.tsx';
import SignUp from './pages/signup/Signup.tsx';
import authLoader from './pages/loader/auth.ts';


const browserAppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path='/welcome' element={<Welcome />} loader={authLoader} />
      <Route path='/login' element={<LogInPage />} loader={authLoader} />
      <Route path='/signup' element={<SignUp />} loader={authLoader} />
    </Route>
  )
);

export default browserAppRouter;