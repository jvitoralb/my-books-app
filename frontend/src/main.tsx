import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {
  QueryClientProvider,
  QueryClient
} from '@tanstack/react-query';
import browserAppRouter from './routes';
import { ChakraProvider } from '@chakra-ui/react';
import './styles/index.css';


const queryClient = new QueryClient();

ReactDOM
.createRoot(document.getElementById('root')!)
.render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={browserAppRouter}/>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
