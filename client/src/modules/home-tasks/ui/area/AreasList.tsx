import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent, List, Stack, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { areasApi } from 'client/modules/home-tasks/api/area/area';
import { AreasListItem } from 'client/modules/home-tasks/ui/area/AreasListItem';

const STALE_TIME_5_MIN = 300000;

const AREA_LIST_QUERY = ['area', 'area-list'];

const AreasList = () => {
  const navigate = useNavigate();
  const { createArea, deleteArea, getAllAreasByUser } = areasApi();
  const areaListQuery = useQueryClient();

  const { data: areas } = useQuery(AREA_LIST_QUERY, () => getAllAreasByUser(), {
    staleTime: STALE_TIME_5_MIN,
  });

  const {
    handleSubmit,
    control,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      area: '',
    },
  });

  const { mutate: mutateCreateArea } = useMutation((data: { area: string }) => createArea(data), {
    onSuccess: () => {
      resetForm();
      areaListQuery.invalidateQueries(AREA_LIST_QUERY);
    },
  });

  const { mutate: mutateDeleteArea } = useMutation((id: string) => deleteArea(id), {
    onSuccess: () => areaListQuery.invalidateQueries(AREA_LIST_QUERY),
  });

  if (!areas) return null;

  const handleDeleteClick = (id: string) => {
    mutateDeleteArea(id);
  };

  const handleEditClick = (id: string) => {
    navigate(id);
  };

  const handleOnSubmitCreateTask = (data: { area: string }) => {
    mutateCreateArea({ ...data });
  };

  return (
    <Stack width="100%" maxWidth="600px" alignItems="center" justifyContent="center" margin="auto" gap={2}>
      <Card
        sx={{
          width: '100%',
        }}
      >
        <CardContent>
          <Stack
            component="form"
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            justifyContent="flex-end"
            gap={4}
            onSubmit={handleSubmit(handleOnSubmitCreateTask)}
          >
            <Controller
              name="area"
              control={control}
              render={({ field }) => {
                return <TextField {...field} label="Add new area/s" />;
              }}
            />
            <Button type="submit">Add Area</Button>
          </Stack>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: '100%',
        }}
      >
        <CardContent>
          <List disablePadding>
            {areas.map(({ area, _id }) => {
              return <AreasListItem key={_id} area={area} id={_id} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />;
            })}
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AreasList;
