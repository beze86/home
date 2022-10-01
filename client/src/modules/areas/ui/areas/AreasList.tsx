import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent, List, Stack, TextField } from '@mui/material';

import { areasApi } from 'client/modules/areas/api/area';
import { Area } from 'client/modules/areas/type/area';
import { AreasListItem } from 'client/modules/areas/ui/areas/AreasListItem';

export const AreasList = () => {
  const navigate = useNavigate();
  const { createArea, deleteArea, getAllAreas } = areasApi();
  const [areas, setAreas] = useState<Area[]>([]);
  const [areaName, setAreaName] = useState('');

  useEffect(() => {
    const dataOnSuccess = async () => {
      const { data } = await getAllAreas();
      setAreas(data);
    };
    dataOnSuccess();
  }, []);

  const handleDeleteClick = async (id: string) => {
    await deleteArea(id);
    const newAreas = areas.filter((area) => area._id !== id);
    setAreas(newAreas);
  };

  const handleEditClick = (id: string) => {
    navigate(id);
  };

  const handleCreateTaskSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await createArea(areaName);
    setAreas((prev) => [...prev, { _id: data.insertedId, area: areaName }]);
    setAreaName('');
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
            <TextField
              size="small"
              label="Add new area/s"
              variant="outlined"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              sx={{
                flex: {
                  xs: '1 1 100%',
                  md: '1 0 auto',
                },
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
