import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const { data } = await axios.get('/api/v1/tasks');
      setTasks(data);
    };
    getTasks();
  }, []);
  console.log(tasks);
  return (
    <ul>
      {tasks.map((task) => {
        <li>ssss</li>;
      })}
    </ul>
  );
};
