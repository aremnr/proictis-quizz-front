import'./AddQuiz.css';
import { Registration } from './componets/Quiz'
import './addQuestion.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Questions } from './componets/Questions';
import { QuestionsWrite } from './componets/QuestionsWrite';
import { AddQuestion } from './componets/AddQuestion';
import { WatchAdBack } from './componets/WatchAdBack';
import { Quests } from './componets/Quests';
import { AddQuiz } from './componets/AddQuiz';
import {QuizForm} from './componets/AddQuestion';
import addQuestion from './addQuestion';
import Leaderboard from './componets/Winner';


const router = createBrowserRouter([
  {
    path:'/question/:id',
    element:<Questions/>,
  }
])

function App() {
  return(
    <div>
      <Leaderboard/>
      
    </div>
  );

}


export default App;
