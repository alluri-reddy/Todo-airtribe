import Kanban from "./components/Kanban";
import {Route, Routes} from 'react-router-dom';
import InDetail from "./components/InDetail";
function App() {

  const defaultCols = [
    {
      id: "todo",
      title: "Todo",
    },
    {
      id: "doing",
      title: "Work in progress",
    },
    {
      id: "done",
      title: "Done",
    },
  ];
  
  const defaultTasks=[
    {
      id: "1",
      columnId: "todo",
      content: "List admin APIs for dashboard",
      description: "this is the description of the task id 1 ",
    },
    {
      id: "2",
      columnId: "todo",
      content:
        "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
    },
    {
      id: "3",
      columnId: "doing",
      content: "Conduct security testing",
    },
    {
      id: "4",
      columnId: "doing",
      content: "Analyze competitors",
    },
    {
      id: "5",
      columnId: "done",
      content: "Create UI kit documentation",
    },
    {
      id: "6",
      columnId: "done",
      content: "Dev meeting",
    },
    {
      id: "7",
      columnId: "done",
      content: "Deliver dashboard prototype",
    },
    {
      id: "8",
      columnId: "todo",
      content: "Optimize application performance",
    },
    {
      id: "9",
      columnId: "todo",
      content: "Implement data validation",
    },
    {
      id: "10",
      columnId: "todo",
      content: "Design database schema",
    },
    {
      id: "11",
      columnId: "todo",
      content: "Integrate SSL web certificates into workflow",
    },
    {
      id: "12",
      columnId: "doing",
      content: "Implement error logging and monitoring",
    },
    {
      id: "13",
      columnId: "doing",
      content: "Design and implement responsive UI",
    },
  ];

  return (
    <div className="App ">

    <Routes>
        <Route path='/' element={<Kanban defaultCols={defaultCols} defaultTasks={defaultTasks} />} />
        <Route path='/task/:id' element= {<InDetail taskdata={defaultTasks} />} />        
    </Routes>
    </div>
  );
}

export default App;
