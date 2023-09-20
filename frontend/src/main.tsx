import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {
  QueryClientProvider,
  QueryClient
} from '@tanstack/react-query';
import browserAppRouter from './routes';
import './styles/index.css';


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
