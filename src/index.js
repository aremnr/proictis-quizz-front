import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import {Home} from './componets/Home/Home';
import {Question} from './componets/Question/question'
import {Questions} from './componets/Question/Questions'
import {Answer} from './componets/Answer/Answer'
const router = createBrowserRouter([
  {
    path:'/question/:id',
    element:<Question/>,
    
  },
  {
    path:'/app',
    element:<App/>
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
    path: '/answer',
    element: <Answer/>
  }

])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


