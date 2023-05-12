import { useForm, Controller } from 'react-hook-form';

import { Button, Card, CardContent, List, Stack, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { AreaCreation, AreaId } from 'client/modules/home-utilities/domain/area/area';
import { Api } from 'client/modules/home-utilities/ui';
import { AreasListItem } from 'client/modules/home-utilities/ui/area/AreasListItem';
import { Page } from 'client/shared/layouts';

const STALE_TIME_5_MIN = 300000;

const AREA_LIST_QUERY = ['area', 'area-list'];

const AreasList = () => {
  const areaListQuery = useQueryClient();

  const { data: areas } = useQuery(AREA_LIST_QUERY, () => Api.getAreas(), {
    suspense: false,
    staleTime: STALE_TIME_5_MIN,
  });

  const {
    handleSubmit,
    control,
    reset: resetForm,
    formState: { errors },
  } = useForm<AreaCreation>({
    defaultValues: {
      area: '',
    },
  });

  const { mutate: mutateCreateArea } = useMutation((data: AreaCreation) => Api.createArea(data), {
    onSuccess: () => {
      resetForm();
      areaListQuery.invalidateQueries(AREA_LIST_QUERY);
    },
  });

  const { mutate: mutateDeleteArea } = useMutation((id: AreaId) => Api.deleteArea(id), {
    onSuccess: () => areaListQuery.invalidateQueries(AREA_LIST_QUERY),
  });

  if (!areas) return null;

  const handleOnClickDeleteArea = (id: AreaId) => {
    mutateDeleteArea(id);
  };

  const handleOnSubmitCreateArea = (data: AreaCreation) => {
    mutateCreateArea({ ...data });
  };

  return (
    <Page>
      <Page.Main>
        <Card sx={{ maxWidth: '600px', marginX: 'auto', marginBottom: 3 }}>
          <CardContent>
            <Stack
              component="form"
              direction="row"
              alignItems="baseline"
              flexWrap="wrap"
              justifyContent="flex-end"
              gap={4}
              onSubmit={handleSubmit(handleOnSubmitCreateArea)}
            >
              <Controller
                name="area"
                control={control}
                rules={{
                  required: {
                    message: 'Required field',
                    value: true,
                  },
                  minLength: {
                    message: 'Minimum 3 characters required',
                    value: 3,
                  },
                }}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <TextField
                      {...rest}
                      label="Add new area/s"
                      onChange={(evt) => {
                        const value = evt.currentTarget.value.trim().toLowerCase();
                        onChange(value);
                      }}
                      error={!!errors.area}
                      helperText={errors.area?.message}
                    />
                  );
                }}
              />
              <Button type="submit">Add Area</Button>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: '600px', marginX: 'auto' }}>
          <CardContent>
            <List disablePadding>
              {areas.map(({ area, _id }) => {
                return <AreasListItem key={_id} area={area} onClickDeleteArea={() => handleOnClickDeleteArea(_id)} />;
              })}
            </List>
          </CardContent>
        </Card>
      </Page.Main>
    </Page>
  );
};

export default AreasList;
