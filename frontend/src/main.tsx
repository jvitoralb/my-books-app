import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import Welcome from './pages/Welcome.tsx';
import LogIn from './pages/Login.tsx';
import SignUp from './pages/Signup.tsx';
import './styles/index.css';


const browserAppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/welcome' element={<Welcome />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/singup' element={<SignUp />} />
    </Route>
  )
);

ReactDOM
.createRoot(document.getElementById('root')!)
.render(
  <React.StrictMode>
    <RouterProvider router={browserAppRouter}/>
  </React.StrictMode>
);
