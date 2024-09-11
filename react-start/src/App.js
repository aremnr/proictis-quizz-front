
import { Registration } from './componets/Quiz'
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Questions } from './componets/Questions';
import { QuestionsWrite } from './componets/QuestionsWrite';
import { AddQuestion } from './componets/AddQuestion';
import { WatchAdBack } from './componets/WatchAdBack';
import { Quests } from './componets/Quests';


const router = createBrowserRouter([
  {
    path:'/question/:id',
    element:<Questions/>,
  }
])

function App() {
  return(
    <div>
      <AddQuestion/>
      
    </div>
  );

}

export default App;
