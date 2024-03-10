import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dele from './assets/delete.png';
import upda from './assets/upda.png';
import upda2 from './assets/update.gif';

const InDetail = ({ tasks, setTasks, columns }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [icon, setIcon] = useState(false);

  // Find the task with the given id
  const item = tasks.find((item) => item.id === id);

  // State for input values
  const [input, setInput] = useState({ ...item });

  // Handle input change for description
  const handleDescriptionChange = (e) => {
    setInput({ ...input, description: e.target.value });
  };
  const handleTitleChange = (e) => {
    setInput({ ...input, title: e.target.value });
  };

  // Handle input change for columnId
  const handleColumnIdChange = (e) => {
    setInput({ ...input, columnId: e.target.value });
  };

  // Update task and navigate
  const handleUpdate = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === input.id ? input : task
    );
    setTasks(updatedTasks);
    navigate('/');
  };

  // Delete task and navigate
  const handleDelete = () => {
    const updatedTasks = tasks.filter((task) => task.id !== input.id);
    setTasks(updatedTasks);
    navigate('/');
  };

  return (
    <div className="bg-white h-screen w-screen flex items-center justify-center transform scale-125 p-5 ">
      <div className="p-4 transform scale-110 mr-10">
        <div className="mb-2">
          <label className="text-black pl-2 pr-2 font-semibold rounded-md bg-rose-200">Status:</label>
          <span className="ml-2 text-black font-bold">{item.columnId}</span>
        </div>
        <div className="mb-2">
          <label className="text-black pl-2 pr-2 font-semibold bg-yellow-200 rounded-md">Title:</label>
          <span className="ml-2 text-black font-bold">{item.title}</span>
        </div>
        <div>
          <label className="text-black pl-2 pr-2 font-semibold bg-blue-200 rounded-md">Description:</label>
          <p className="text-white font-bold mt-4 border bg-neutral-800 border-gray-300 rounded-md p-5 ">{item.description}</p>
        </div>
      </div>

      <div className='flex flex-col justify-start '>
        <div className='flex justify-start items-center gap-2'>
          <label className="text-black pl-2 pr-2 font-semibold bg-blue-200 rounded-md">Edit Status --></label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
            value={input.columnId}
            onChange={handleColumnIdChange}
          >
            {columns.map((col) => (
              <option key={col.id} value={col.title}>{col.title}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-row justify-start items-center gap-2'>
          <label className="text-black pl-2 pr-2 font-semibold bg-blue-200 rounded-md">Edit Description --> </label>
          <textarea
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 resize-none h-auto min-h-[40px] max-h-[200px]"
            value={input.description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className='flex flex-row justify-start items-center gap-2'>
          <label className="text-black pl-2 pr-2 font-semibold bg-blue-200 rounded-md">Edit Title --> </label>
          <textarea
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 resize-none h-auto min-h-[40px] max-h-[200px]"
            value={input.title}
            onChange={handleTitleChange}
          />
        </div>

        <div className='flex justify-start items-center gap-2'>
          <label className="text-black pl-2 pr-2 font-semibold bg-blue-200 rounded-md">Update --> </label>
          {icon ? <img src={upda2} onClick={handleUpdate} onMouseLeave={() => setIcon(false)} className='h-6 w-6 cursor-pointer' alt="update" />: <img src={upda} className='h-6 w-6 cursor-pointer' onMouseEnter={() => setIcon(true)} alt="update" />}
          
          <div className='text-black font-bold' >or</div>
          <img src={dele} alt="delete" className='h-10 w-10 mr-2 cursor-pointer' onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default InDetail;
