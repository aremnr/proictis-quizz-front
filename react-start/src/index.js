import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { AddQuiz } from './componets/AddQuiz';
import { AddQuestion } from './componets/AddQuestion';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);


