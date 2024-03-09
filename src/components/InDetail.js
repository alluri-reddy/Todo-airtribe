import React from 'react';
import { useParams } from 'react-router-dom';


const InDetail = ({taskdata}) => {
  const { id } = useParams(); 


  console.log(id);
  const item = taskdata.find((item) => item.id === id);

  console.log(item);

  return (
    <div>
     <h2>{item.content}</h2>
      <p>{item.id}</p>
      <p>{item.columnId}</p>
      <p>{item.description}</p> 
    </div>
  )
}

export default InDetail