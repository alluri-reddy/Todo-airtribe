import React, {useState} from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext } from '@dnd-kit/sortable';
import Task from './Task';
import { useMemo } from 'react';
import plus from './assets/plus.png';
import { useNavigate } from 'react-router-dom';
import DeleteAlert from './DeleteAlert';
import del from './assets/del.png';
import del2 from './assets/del2.gif';


const Status = ({column, tasks, setColumns, columns}) => {

  const [showAlert, setShowAlert] = useState(false);
  const [icon, setIcon] = useState(false);
    
   const navi = useNavigate();
   function hadlenewTask(){
    navi('/newtask');
   }

   const handleDeleteColumn = () => {
    setShowAlert(true);
  };

  const handleDeleteConfirmation = () => {
    const filteredColumns = columns.filter((col) => col.id !== column.id);
    setColumns(filteredColumns);
    setShowAlert(false);
  };
    
    const {setNodeRef, attributes,listeners,transform, transition } =useSortable({id: column.id, data:{
        type: "Column",
        column,
    }});

    const style = {transition, transformOrigin: 'center', transform: CSS.Transform.toString(transform)};

    
    // Got the tasks for the current column 
    const tasksIds = useMemo(() => {
      return tasks.map((task) => task.id);
    }, [tasks]);

    const calculateTaskCount = (columnId) => {
      return tasks.filter(task => task.columnId === columnId).length;
    };
    
  // Calculated the number of tasks in the column
    const taskCount = useMemo(() => {
      return calculateTaskCount(column.id);
    }, [tasks, columns, column.id]);
    

   // function to change the column title
    function changeColumnTitle(column, e) {
      const newTitle = e.target.value;
      const columnIndex = columns.findIndex(col => col.title === column.title);
    
      const updatedColumns = [...columns];
      updatedColumns[columnIndex].title = newTitle;
  
      setColumns(updatedColumns);
    }


  return (
    <div ref={setNodeRef} style={style} className={`bg-white p-4 rounded-md w-[300px] h-screen flex flex-col`} >
      <div className='flex items-center'>
        <div {...attributes} {...listeners} style={{ backgroundColor: column.color }} className={`p-2 rounded-md w-full h-[50px] flex items-center justify-center active:cursor-grabbing cursor-grab text-black font-semibold ml-2`}>
        <textarea className='text-center w-full h-full hover:cursor-grab active:cursor-grabbing bg-transparent outline-none resize-none' value={column.title} onChange={(e) => changeColumnTitle(column,e)} />
        </div>
        {icon ? <img src={del2} onClick={handleDeleteColumn} onMouseLeave={() => setIcon(false)} className='h-6 w-6 cursor-pointer' alt="delete" />: <img src={del} className='h-6 w-6 cursor-pointer' onMouseEnter={() => setIcon(true)} alt="delete" />}

        <div className='text-white pt-1.3 pb-1.3 pl-1.5 pr-1.5 rounded-lg ml-2 bg-black'>{taskCount}</div>

      </div>
      
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto mt-5">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
        <button onClick={hadlenewTask} className='p-2 ml-2 mt-4 h-[25px] w-[100px] cursor-pointer rounded-lg border-2 ring-rose-500 hover:ring-2 hover:bg-white text-black flex items-center'>
         
         <img src={plus} className='h-4 w-4' alt="add task" />
          <div className='ml-2'>New</div>
        </button>
        
      </div>
      {showAlert && <DeleteAlert setShowAlert={setShowAlert} handleDeleteConfirmation={handleDeleteConfirmation} />}
    </div>
  )
}

export default Status

