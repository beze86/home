import React, { useEffect, useState, MouseEvent } from 'react';

import { Card, CardContent, List, ListItem, IconButton, Typography } from '@mui/material';
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
      <CardContent sx={{ py: 4, px: 5 }}>
        <List disablePadding>
          {areas.map(({ area, _id }) => {
            return (
              <ListItem
                key={_id}
                data-id={_id}
                disableGutters
                secondaryAction={
                  <>
                    <IconButton onClick={handleClick} edge="start" aria-label="edit">
                      <Create sx={{ color: 'primary.main' }} />
                    </IconButton>
                    <IconButton onClick={handleDelete} edge="end" aria-label="delete">
                      <Delete sx={{ color: 'error.main' }} />
                    </IconButton>
                  </>
                }
              >
                <Typography variant="subtitle1" component="p" sx={{ textTransform: 'capitalize' }}>
                  {area}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
