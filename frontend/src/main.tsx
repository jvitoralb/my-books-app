import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import {
  QueryClientProvider,
  QueryClient
} from '@tanstack/react-query';
import App from './App.tsx';
import Home, { homeLoader } from './pages/Home.tsx';
import Welcome from './pages/Welcome.tsx';
import LogIn, { loginLoader } from './pages/Login.tsx';
import SignUp from './pages/Signup.tsx';
import './styles/index.css';


const browserAppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path='/welcome' element={<Welcome />} />
      <Route path='/login' element={<LogIn />} loader={loginLoader}/>
      <Route path='/signup' element={<SignUp />} />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM
.createRoot(document.getElementById('root')!)
.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={browserAppRouter}/>
    </QueryClientProvider>
  </React.StrictMode>
);
