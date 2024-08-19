import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import './index.css';
import App from './App';
import './App.css';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import {Home} from './componets/Home/Home';
import {Question} from './componets/Question/question'
import {Questions} from './componets/Question/Questions'
import {Answer} from './componets/Answer/Answer'
import {Wait} from './componets/WaitArea/wait'
import {Winner} from './componets/Winner/Winner'

const router = createBrowserRouter([
  {
    path:'/question/:id',
    element:<Question/>,
    
  },
  {
    path:'/app',
    element:<App />
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path: '/',
    element: <Navigate to='/home' replace />
  },
  {
    path: '/questions/:id',
    element: <Questions/>
  },
  {
    path: '/answer/:id',
    element: <Answer/>
  },
  {
    path: '/wait',
    element: <Wait/>
  },
  {
    path: '/winner',
    element: <Winner/>
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router}/>
    </StyledEngineProvider>
  </React.StrictMode>
);


