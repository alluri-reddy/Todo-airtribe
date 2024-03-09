import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext } from '@dnd-kit/sortable';
import Task from './Task';
import { useMemo } from 'react';


const Status = ({column, tasks}) => {
    

    
    const {setNodeRef, attributes,listeners,transform, transition } =useSortable({id: column.id, data:{
        type: "Column",
        column,
    }});

    const style = {transition, transformOrigin: 'center', transform: CSS.Transform.toString(transform)};


    const tasksIds = useMemo(() => {
      return tasks.map((task) => task.id);
    }, [tasks]);


  return (
    <div ref={setNodeRef} style={style} className='bg-slate-700 p-2 rounded-md w-[300px] h-[450px] flex flex-col '>
      <div {...attributes} {...listeners} className='bg-slate-800 p-2 rounded-md w-full h-[50px] flex items-center justify-center active:cursor-grabbing cursor-grab'>{column.title}</div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default Status