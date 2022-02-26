import React, { FormEvent, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Box, Button, Card, CardContent, List } from '@mui/material';

import { tasksApi } from 'client/modules/main/api/task';
import { Task } from 'client/modules/main/type/task';
// import { AreasListItem } from 'client/modules/main/ui/areas/AreasListItem';

export const TasksList = () => {
  //   const navigate = useNavigate();
  const { getAllTasks, createWeeklyTask } = tasksApi();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const dataOnSuccess = async () => {
      const { data } = await getAllTasks();
      setTasks(data);
    };
    dataOnSuccess();
  }, []);

  const handleCreateTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createWeeklyTask();
  };

  return (
    <>
      <Card
        sx={{
          width: '100%',
          maxWidth: '600px',
          m: 'auto',
          mb: 2,
        }}
      >
        <CardContent
          sx={{
            py: 4,
            px: 5,
            pb: 4,
            '&:last-child': {
              pb: 4,
            },
          }}
        >
          <Box
            component="form"
            onSubmit={handleCreateTaskSubmit}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: {
                xs: 'flex-end',
                md: 'space-between',
              },
              flexWrap: 'wrap',
              gap: 4,
            }}
          >
            <Button type="submit" variant="contained">
              Create Weekly Task
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: '100%',
          maxWidth: '600px',
          m: 'auto',
        }}
      >
        <CardContent
          sx={{
            py: 4,
            px: 5,
            pb: 4,
            '&:last-child': {
              pb: 4,
            },
          }}
        >
          <List disablePadding>
            {tasks.map(({ _id, start, end, users }) => {
              return (
                <li key={_id}>
                  <span>start: {dayjs(start).format('DD/MM/YYYY')}</span>
                  <span>end: {dayjs(end).format('DD/MM/YYYY')}</span>
                  <ul>
                    {users.map(({ name, area }) => {
                      return <li key={name}>{`${name}: ${area}`}</li>;
                    })}
                  </ul>
                </li>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
};
