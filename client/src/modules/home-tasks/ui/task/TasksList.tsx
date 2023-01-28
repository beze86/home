import dayjs from 'dayjs';
import { FormEvent } from 'react';

import { Delete } from '@mui/icons-material';
import { Button, Card, CardContent, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { tasksApi } from 'client/modules/home-tasks/api/task/task';
import { TaskId } from 'client/modules/home-tasks/domain/task/task';
import { CenteredStack } from 'client/shared/components/CenteredStack/CenteredStack';

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

  const { mutate: mutateDeleteClick } = useMutation((id: TaskId) => deleteWeeklyTask(id), {
    onSuccess: () => taskListQuery.invalidateQueries(TASK_LIST_QUERY),
  });

  if (!tasks) return null;

  const handleOnSubmitCreateTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateCreateWeeklyTask();
  };

  const handleOnClickDelete = async (id: TaskId) => {
    mutateDeleteClick(id);
  };

  return (
    <CenteredStack>
      <Card>
        <CardContent>
          <Stack component="form" direction="row" alignItems="center" justifyContent="flex-end" onSubmit={handleOnSubmitCreateTask}>
            <Button type="submit">Create Weekly Task</Button>
          </Stack>
        </CardContent>
      </Card>
      {tasks.map(({ _id, start, end, users }) => {
        return (
          <Card
            key={_id}
            sx={{
              marginBottom: 1,
            }}
          >
            <CardContent>
              <Stack direction="row" alignItems="center">
                <Typography component="span" variant="subtitle1" sx={{ mr: 3 }}>
                  Start: {dayjs(start).format('DD/MM/YYYY')}
                </Typography>
                <Typography component="span" variant="subtitle1" sx={{ mr: 'auto' }}>
                  End: {dayjs(end).format('DD/MM/YYYY')}
                </Typography>
                <IconButton onClick={() => handleOnClickDelete(_id)} aria-label="delete">
                  <Delete color="error" />
                </IconButton>
              </Stack>

              <List>
                {users.map(({ name, area }) => {
                  return <ListItem key={name}>{`${name}: ${area}`}</ListItem>;
                })}
              </List>
            </CardContent>
          </Card>
        );
      })}
    </CenteredStack>
  );
};

export default TasksList;
