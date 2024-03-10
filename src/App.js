import Main from "./components/Main";
import {Route, Routes} from 'react-router-dom';
import InDetail from "./components/InDetail";
import { useState } from "react";
import NewTask from "./components/NewTask";
import { defaultCols, defaultTasks } from "./components/data";
function App() {
  
  const [tasks, setTasks] = useState(defaultTasks);
  const [columns, setColumns] = useState(defaultCols);

  return (
    <div className="App p-10 flex justify-center items-center">
    <Routes>
        <Route path='/' element={<Main columns={columns} setColumns={setColumns} tasks={tasks} setTasks={setTasks} />} />
        <Route path='/task/:id' element= {<InDetail tasks={tasks} setTasks={setTasks} columns={columns} />} /> 
        <Route path='/newtask' element= {<NewTask tasks={tasks} setTasks={setTasks} columns={columns} />} />        
    </Routes>
    </div>
  );
}

export default App;
