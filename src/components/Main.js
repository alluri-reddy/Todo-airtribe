import React, {useMemo } from 'react';
import { useState } from 'react';
import Status from './Status';
import { DndContext,PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, } from '@dnd-kit/sortable';
import {DragOverlay,} from "@dnd-kit/core";
import { createPortal } from 'react-dom';
import Task from './Task';

const Main = ({tasks, setTasks, columns, setColumns}) => {
 
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const columnsId = useMemo(() => columns.map(column => column.id), [columns]);

  //sensor for pointer events 
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 3,
    }
  }))

  return (
    <div className='bg-white h-screen text-white m-auto flex min-h-screen w-ful items-center overflow-x-auto overflow-y-hidden px=[40px]' >
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver} >
        <div className='m-auto'>
          <SortableContext items={columnsId} >
            <div className='flex gap-2' >
              {columns.map(colum => <Status key={colum.id} column={colum} columns={columns} setColumns={setColumns} tasks={tasks.filter((task) => task.columnId === colum.id)} /> )}
              <button onClick={() =>{createNewColumn();}} className='p-4 mt-4 h-[50px] w-[200px] cursor-pointer rounded-lg border-2 ring-rose-500 hover:ring-2 hover:bg-slate-900 hover:text-white text-black flex items-center justify-center'>+ ADD Column</button>
            </div>
          </SortableContext>
          
        </div>
        {createPortal(
          <DragOverlay> 

            {activeColumn && (
              <Status column={activeColumn} tasks={tasks.filter((task) => task.columnId === activeColumn.id)}/>
            )}

            {activeTask && (
              <Task task={activeTask}/>
            )}

          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )

  //function to create new column 
  function createNewColumn(){
    const columnToAdd = {
     id: Math.floor(Math.random() * 10001),
     title: `Column ${columns.length + 1}`,
     color: '#ffccd1'
    };
     setColumns([...columns, columnToAdd]);
 }

  // function to handle drag start event
  function onDragStart(DragStartEvent) {
   if (DragStartEvent.active.data.current?.type === "Column") {
     setActiveColumn(DragStartEvent.active.data.current.column);
     return;
   }

   if (DragStartEvent.active.data.current?.type === "Task") {
     setActiveTask(DragStartEvent.active.data.current.task);
     return;
   }
 }

  // function to handle drag end event
  function onDragEnd(DragEndEvent) {
   setActiveColumn(null);
   setActiveTask(null);

   const { active, over } = DragEndEvent;
   if (!over) return;

   const activeId = active.id;
   const overId = over.id;

   if (activeId === overId) return;

   const isActiveAColumn = active.data.current?.type === "Column";
   if (!isActiveAColumn) return;


   setColumns((columns) => {
     const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

     const overColumnIndex = columns.findIndex((col) => col.id === overId);

     return arrayMove(columns, activeColumnIndex, overColumnIndex);
   });
 }

  // function to handle drag over event
  function onDragOver(DragOverEvent) {
   const { active, over } = DragOverEvent;
   if (!over) return;

   const activeId = active.id;
   const overId = over.id;

   if (activeId === overId) return;

   const isActiveATask = active.data.current?.type === "Task";
   const isOverATask = over.data.current?.type === "Task";

   if (!isActiveATask) return;

 
   if (isActiveATask && isOverATask) {
     setTasks((tasks) => {
       const activeIndex = tasks.findIndex((t) => t.id === activeId);
       const overIndex = tasks.findIndex((t) => t.id === overId);

       if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
         tasks[activeIndex].columnId = tasks[overIndex].columnId;
         return arrayMove(tasks, activeIndex, overIndex - 1);
       }

       return arrayMove(tasks, activeIndex, overIndex);
     });
   }

   const isOverAColumn = over.data.current?.type === "Column";


     if (isActiveATask && isOverAColumn) {
       setTasks((tasks) => {
         const activeIndex = tasks.findIndex((t) => t.id === activeId);

         tasks[activeIndex].columnId = overId;
         return arrayMove(tasks, activeIndex, activeIndex);
       });
     }
   }
}

export default Main