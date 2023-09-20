import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import App from './App.tsx';
import Home from './pages/home/Home.tsx';
import homeLoader from './pages/home/home.loader.ts';
import Welcome from './pages/welcome/Welcome.tsx';
import LogIn from './pages/login/Login.tsx';
import loginLoader from './pages/login/login.loader.ts';
import SignUp from './pages/signup/Signup.tsx';


const browserAppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path='/welcome' element={<Welcome />} />
      <Route path='/login' element={<LogIn />} loader={loginLoader} />
      <Route path='/signup' element={<SignUp />} />
    </Route>
  )
);

export default browserAppRouter;