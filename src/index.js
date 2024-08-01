import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { Questions } from './componets/Questions';
import { QuestionsWrite } from './componets/QuestionsWrite';
import {Registration} from './componets/Quiz';
import {Home} from './componets/Home/Home1';

const router = createBrowserRouter([
  {
    path:'/question/:id',
    element:<Questions/>,
    
  },
  {
    path:'/app',
    element:<App/>
  },
  {
    path:'/registration',
    element: <Registration/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path: '/',
    element: <Navigate to='/home' replace />
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


