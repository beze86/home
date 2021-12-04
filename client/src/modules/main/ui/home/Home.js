import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const t = async () => {
            const { data } = await axios.get('/api/v1/users')
            setUsers(data)
        }
        t()
    }, [])

  return (
      <ul>
          {users && users.map((user) => {
              return `${user.name}: ${user.color}`;
          })}
      </ul>
  );
};
