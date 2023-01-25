import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent, List, Stack, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { areasApi } from 'client/modules/home-tasks/api/area/area';
import { Area } from 'client/modules/home-tasks/domain/area/area';
import { AreasListItem } from 'client/modules/home-tasks/ui/area/AreasListItem';

const STALE_TIME_5_MIN = 300000;

const AREA_LIST_QUERIES = ['area', 'area-list'];

const AreasList = () => {
  const navigate = useNavigate();
  const { createArea, deleteArea, getAllAreasByUser } = areasApi();
  const areaListQuery = useQueryClient();

  const { data: areas } = useQuery(AREA_LIST_QUERIES, () => getAllAreasByUser(), {
    staleTime: STALE_TIME_5_MIN,
  });

  const { handleSubmit, control } = useForm({
    defaultValues: {
      area: '',
    },
  });

  const { mutate: mutateCreateArea } = useMutation((data: { area: string }) => createArea(data), {
    onSuccess: () => areaListQuery.invalidateQueries(AREA_LIST_QUERIES),
  });

  const { mutate: mutateDeleteArea } = useMutation((id: string) => deleteArea(id), {
    onSuccess: () => areaListQuery.invalidateQueries(AREA_LIST_QUERIES),
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
            onSubmit={handleSubmit(handleOnSubmitCreateTask)}
          >
            <Controller
              name="area"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    size="small"
                    label="Add new area/s"
                    variant="outlined"
                    sx={{
                      flex: {
                        xs: '1 1 100%',
                        md: '1 0 auto',
                      },
                    }}
                  />
                );
              }}
            />
            <Button type="submit" variant="contained">
              Add Area
            </Button>
          </Stack>
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
            {areas.map(({ area, _id }) => {
              return <AreasListItem key={_id} area={area} id={_id} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} />;
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default AreasList;
