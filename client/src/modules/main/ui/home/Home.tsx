import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

export const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const t = async () => {
      const { data } = await axios.get('/api/v1/users');
      setUsers(data);
    };
    t();
  }, []);
  console.log(users);
  return (
    <>
    <ul>
      {users.length > 0 &&
        users.map(
          (user: { name: string; color: string }) => {
            return `${user.name}: ${user.color}`;
          }
        )}
    </ul>
    <Button variant="contained">Hey there!</Button>
    </>
  );
};
