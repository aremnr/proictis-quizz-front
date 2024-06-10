
import { Registration } from './componets/Quiz'
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Questions } from './componets/Questions';
import { QuestionsWrite } from './componets/QuestionsWrite';


const router = createBrowserRouter([
  {
    path:'/question/:id',
    element:<Questions/>,
  }
])

function App() {
  return(
    <div>
      <QuestionsWrite/>
      
    </div>
  );

}

export default App;
