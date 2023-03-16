import { Controller, useFormContext } from 'react-hook-form';

import { faCheck, faPalette } from '@fortawesome/pro-regular-svg-icons';
import { Box, Stack, TextField, MenuItem } from '@mui/material';

import { EventCreation } from 'client/modules/home-tasks/domain/calendar/calendar';
import { Color, eventColorsMap } from 'client/modules/home-tasks/domain/calendar/calendar-colors';
import { Icon } from 'client/shared/components/Icon';

const NewDateDialogColorSelector = () => {
  const { control, watch } = useFormContext<EventCreation>();

  return (
    <Stack flexDirection="row" alignItems="center" gap={3}>
      <Icon icon={faPalette} />
      <Controller
        name="backgroundColor"
        control={control}
        render={({ field: { ...rest } }) => {
          return (
            <TextField
              {...rest}
              select
              sx={{
                maxWidth: '65px',
              }}
              SelectProps={{
                autoWidth: true,
                MenuProps: {
                  PaperProps: {
                    sx: (theme) => ({
                      '& .MuiList-root': {
                        display: 'flex',
                        padding: theme.spacing(2),
                        maxWidth: '66px',
                        flexWrap: 'wrap',
                        gap: theme.spacing(2),
                        '& .MuiMenuItem-root': {
                          padding: theme.spacing(0),
                          minHeight: 'auto',
                          overflow: 'hidden',
                          borderRadius: '50%',
                        },
                        '& .MuiMenuItem-root > .MuiBox-root > svg ': {
                          display: 'none',
                        },
                        '& .MuiMenuItem-root.Mui-selected > .MuiBox-root > svg ': {
                          display: 'block',
                        },
                      },
                    }),
                  },
                },
              }}
            >
              {Object.entries(eventColorsMap).map(([key, value]) => {
                const isChecked = watch('backgroundColor') === value;
                return (
                  <MenuItem key={key} value={value}>
                    <Box
                      sx={(theme) => ({
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '20px',
                        width: '20px',
                        backgroundColor: eventColorsMap[key as Color],
                        color: 'white',
                      })}
                    >
                      {isChecked && <Icon icon={faCheck} size="xs" />}
                    </Box>
                  </MenuItem>
                );
              })}
            </TextField>
          );
        }}
      />
    </Stack>
  );
};

export { NewDateDialogColorSelector };
