import dayjs from 'dayjs';
import { FormEvent } from 'react';

import { Delete } from '@mui/icons-material';
import { Button, Card, CardContent, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { tasksApi } from 'client/modules/home-tasks/api/task/task';

const TASK_LIST_QUERY = ['tasks', 'task-list'];
const STALE_TIME_5_MIN = 300000;

const TasksList = () => {
  const { getAllTasksByUser, createWeeklyTask, deleteWeeklyTask } = tasksApi();
  const taskListQuery = useQueryClient();

  const { data: tasks } = useQuery(TASK_LIST_QUERY, () => getAllTasksByUser(), {
    suspense: false,
    staleTime: STALE_TIME_5_MIN,
  });

  const { mutate: mutateCreateWeeklyTask } = useMutation(() => createWeeklyTask(), {
    onSuccess: () => taskListQuery.invalidateQueries(TASK_LIST_QUERY),
  });

  const { mutate: mutateDeleteClick } = useMutation((id: string) => deleteWeeklyTask(id), {
    onSuccess: () => taskListQuery.invalidateQueries(TASK_LIST_QUERY),
  });

  if (!tasks) return null;

  const handleCreateTaskSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateCreateWeeklyTask();
  };

  const handleDeleteClick = async (id: string) => {
    mutateDeleteClick(id);
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
          <Stack
            component="form"
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
            flexWrap="wrap"
            justifyContent={{ xs: 'flex-end', md: 'space-between' }}
            gap={4}
            onSubmit={handleCreateTaskSubmit}
          >
            <Button type="submit" variant="contained">
              Create Weekly Task
            </Button>
          </Stack>
        </CardContent>
      </Card>
      {tasks.map(({ _id, start, end, users }) => {
        return (
          <Card
            key={_id}
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
                '&:last-child': {
                  pb: 4,
                },
              }}
            >
              <Stack direction="row" alignItems="center">
                <Typography component="span" variant="subtitle1" sx={{ mr: 3 }}>
                  Start: {dayjs(start).format('DD/MM/YYYY')}
                </Typography>
                <Typography component="span" variant="subtitle1" sx={{ mr: 'auto' }}>
                  End: {dayjs(end).format('DD/MM/YYYY')}
                </Typography>
                <IconButton onClick={() => handleDeleteClick(_id)} edge="end" aria-label="delete">
                  <Delete sx={{ color: 'error.main' }} />
                </IconButton>
              </Stack>

              <List disablePadding>
                {users.map(({ name, area }) => {
                  return <ListItem key={name}>{`${name}: ${area}`}</ListItem>;
                })}
              </List>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default TasksList;
