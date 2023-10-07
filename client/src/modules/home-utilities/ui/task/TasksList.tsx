import dayjs from 'dayjs';
import { FormEvent } from 'react';

import { faTrash } from '@fortawesome/pro-solid-svg-icons';
import { Button, Card, CardContent, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TaskId } from 'client/modules/home-utilities/domain/task/task';
import { Api } from 'client/modules/home-utilities/ui';
import { Icon } from 'client/shared/components';
import { Page } from 'client/shared/layouts';

const TASK_LIST_QUERY = ['tasks', 'task-list'];
const STALE_TIME_5_MIN = 300000;

const TasksList = () => {
  const taskListQuery = useQueryClient();

  const { data: tasks } = useQuery(TASK_LIST_QUERY, Api.getTasks, {
    suspense: false,
    staleTime: STALE_TIME_5_MIN,
  });

  const { mutate: mutateCreateWeeklyTask } = useMutation(Api.createWeeklyTask, {
    onSuccess: () => taskListQuery.invalidateQueries(TASK_LIST_QUERY),
  });

  const { mutate: mutateDeleteClick } = useMutation((id: TaskId) => Api.deleteWeeklyTask(id), {
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
    <Page>
      <Page.Main>
        <Card sx={{ maxWidth: '600px', marginX: 'auto', marginBottom: 3 }}>
          <CardContent>
            <Stack
              component="form"
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              onSubmit={handleOnSubmitCreateTask}
            >
              <Button type="submit">Create Weekly Task</Button>
            </Stack>
          </CardContent>
        </Card>
        {tasks.map(({ _id, start, end, users }) => {
          return (
            <Card
              key={_id}
              sx={{
                maxWidth: '600px',
                marginX: 'auto',
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
                    <Icon icon={faTrash} size="18px" color="error.main" />
                  </IconButton>
                </Stack>

                <List>
                  {users.map(({ name, area }) => {
                    return (
                      <ListItem key={`${name}-${area}`}>
                        <Typography component="span" sx={{ textTransform: 'capitalize', mr: 2 }}>
                          {name}:
                        </Typography>
                        <Typography component="span" sx={{ textTransform: 'lowercase' }}>
                          {area}
                        </Typography>
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          );
        })}
      </Page.Main>
    </Page>
  );
};

export default TasksList;
