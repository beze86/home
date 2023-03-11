import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { faGripLines } from '@fortawesome/pro-regular-svg-icons';
import { Button, Stack, TextField } from '@mui/material';

import { EventCreation } from 'client/modules/calendar/domain/calendar';
import { Icon } from 'client/shared/components/Icon';

const NewDateDialogDescription = () => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const { control } = useFormContext<EventCreation>();

  const handleClickShowDescription = () => setIsDescriptionVisible(true);

  return (
    <Stack flexDirection="row" alignItems="center" gap={3}>
      <Icon icon={faGripLines} />
      {!isDescriptionVisible ? (
        <Button variant="text" onClick={handleClickShowDescription}>
          Add description
        </Button>
      ) : (
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return <TextField {...field} variant="standard" multiline label="Add description" />;
          }}
        />
      )}
    </Stack>
  );
};

export { NewDateDialogDescription };
