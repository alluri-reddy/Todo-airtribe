
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";



function TaskCard({task}) {
  
  const navigate = useNavigate();

  const {setNodeRef,attributes,listeners,transform,transition,isDragging,} = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }

  

  function handleClick() {
    console.log(task.id)
    navigate(`/task/${task.id}`);
  }
  

  return (
    <div onClick={handleClick} ref={setNodeRef} style={style} {...attributes} {...listeners}  className="bg-black p-3 h-[100px] min-h-[100px]  flex items-center text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 active:cursor-grabbing cursor-grab relative task overflow-x-hidden overflow-y-auto">
      
      <p className="my-auto h-[90%] w-full overflow-y-hidden overflow-x-hidden whitespace-pre-wrap flex items-center justify-center">
        {task.title}
      </p>
 
    </div>
  );
}

export default TaskCard;