import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewTask = ({ tasks, setTasks, columns }) => {

  const navigate = useNavigate();
  const [input, setInput] = useState({
    id: Math.floor(Math.random() * 10001).toString() ,
    columnId: 'Not Started',
    title: '',
    description: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!input.title.trim()) {
        alert('Title cannot be empty');
        return;
      }
    setTasks(prevTasks => [...prevTasks, input]);
  
    navigate('/');
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  return (
    <div className="bg-white h-screen flex flex-col mt-10 items-center">
      <form onSubmit={handleSubmit} className="p-4 mb-4 flex flex-col justify-start">
        <div className="mb-2 flex justify-start items-center">
          <label className="text-black pl-2 pr-2 font-semibold rounded-md bg-rose-200">Status:</label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 ml-4"
            name="columnId"
            value={input.columnId}
            onChange={handleChange}
          >
            {columns.map((col) => (
              <option key={col.id} value={col.title}>{col.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="text-black pl-2 pr-2 font-semibold bg-yellow-200 rounded-md">Title:</label>
          
          <input
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 ml-4"
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
          />
        </div>
        <div className='flex justify-start items-center'>
          <label className="text-black pl-2 pr-2 font-semibold bg-blue-200 rounded-md">Description:</label>
          <textarea
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 ml-4"
            name="description"
            value={input.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          Create Task
        </button>
      </form>
    </div>
  );

  
};

export default NewTask;
