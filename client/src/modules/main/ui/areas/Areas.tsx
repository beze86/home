import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Card, CardContent, List, TextField } from '@mui/material';

import { areasApi } from 'client/modules/main/api/areas';
import { AreasList } from 'client/modules/main/ui/areas/AreasList';

export const Areas = () => {
  const navigate = useNavigate();
  const { getAllAreas } = areasApi();
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getAllAreas();
      setAreas(data);
    })();
  }, []);

  const handleDeleteClick = (id: string) => {
    console.log(id);
  };

  const handleEditClick = (id: string) => {
    navigate(id);
  };

  const handleCreateTaskSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <TextField
              size="small"
              label="Add new task"
              variant="outlined"
              sx={{
                flex: {
                  xs: '1 1 100%',
                  md: '1 0 auto',
                },
              }}
            />
            <Button variant="contained">Add Task</Button>
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
            {areas.map(({ area, _id }) => {
              return (
                <AreasList
                  key={_id}
                  area={area}
                  id={_id}
                  handleDeleteClick={handleDeleteClick}
                  handleEditClick={handleEditClick}
                />
              );
            })}
          </List>
        </CardContent>
      </Card>
    </>
  );
};
