import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import './index.css';
import App from './App';
import './App.css';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import {Home} from './componets/client/Home/Home';
import {Questions} from './componets/client/Question/Questions';
import {Answer} from './componets/client/Answer/Answer';
import {Wait} from './componets/client/WaitArea/wait';
import {Winner} from './componets/client/Winner/Winner';
import { Fade } from '@mui/material';
import {AddQuestion} from './componets/admin/addquestion/AddQuestion';
import {Quests} from './componets/admin/quests/Quests';
import {WatchAdBack} from './componets/admin/watchadback/WatchAdBack';
import {AdminReg} from './componets/admin/adminreg/AdminReg';
import {Welcome} from './componets/admin/Welcome/Welcome';
import {AdminLog} from './componets/admin/adminlog/adminlog';
import {PreviousQuiz} from './componets/admin/previousquiz/PreviousQuiz';
import {AddQuiz} from './componets/admin/addquiz/AddQuiz';
import {Done} from './componets/admin/done/Done';
import {Aboutquiz} from './componets/admin/aboutquiz/Aboutquiz'






const router = createBrowserRouter([
  {
    path:'/app',
    element:<App />
  },
  {
    path:'/home',
    element:
    <Fade in>
    <div>
      <Home/>
    </div>
    </Fade>
  },
  {
    path: '/',
    element: <AdminLog/>
  },
  
  {
    path: '/questions/:id',
    element: <Fade in timeout={2000}>
      <div>
        <Questions/>
      </div>
    </Fade>
  },
  {
    path: '/answer/:id',
    element:
    <Fade in timeout={1000}>  
      <div>
        <Answer/>
      </div>
    </Fade>
  },
  {
    path: '/wait',
    element: <Wait/>
  },
  {
    path: '/winner',
    element: <Winner/>
  },
  {
    path: '/AddQuestion',
    element: <AddQuestion/>
  },
  {
    path: '/Quests',
    element: <Quests/>
  },
  {
    path: '/WatchAdBack',
    element: <WatchAdBack/>
  },
  {
    path: '/Adminreg',
    element: <AdminReg/>
  },
  {
    path: '/Welcome',
    element: <Welcome/>
  },
  {
    path: '/Adminlog',
    element: <AdminLog/>
  },
  {
    path: '/PreviousQuiz',
    element: <PreviousQuiz/>
  },
  {
    path: '/AddQuiz',
    element: <AddQuiz/>
  },
  {
    path: '/Done',
    element: <Done/>
  },
  {
    path: "/editor", 
  element: <AddQuestion />
  },
  {
    path: '/aboutquiz',
    element: <Aboutquiz/>
  }


])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router}/>
    </StyledEngineProvider>
  </React.StrictMode>
);


