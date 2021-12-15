import React, { useEffect, useState, MouseEvent } from 'react';

import { Card, CardContent, List, ListItem, IconButton } from '@mui/material';
import { Create, Delete } from '@mui/icons-material';

import { areasApi } from 'client/modules/main/api/areas';

export const Areas = () => {
  const { getAllAreas } = areasApi();
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getAllAreas().then(({ data }) => setAreas(data));
  }, []);

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    const icon = e.target as Element;
    const iconParent = icon.closest('li[data-id]') as HTMLElement;
    console.log(iconParent.dataset.id);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const icon = e.target as Element;
    const iconParent = icon.closest('li[data-id]') as HTMLElement;
    console.log(iconParent.dataset.id);
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '600px',
        m: 'auto',
      }}
    >
      <CardContent>
        <List>
          {areas.map(({ area, _id }) => {
            return (
              <ListItem
                key={_id}
                data-id={_id}
                secondaryAction={
                  <>
                    <IconButton onClick={handleClick} edge="start" aria-label="edit">
                      <Create />
                    </IconButton>
                    <IconButton onClick={handleDelete} edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                {area}
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
