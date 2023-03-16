import { format } from 'date-fns';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { faClockEight } from '@fortawesome/pro-regular-svg-icons';
import { DateSelectArg } from '@fullcalendar/core';
import { Button, Stack, Typography, Checkbox, FormControlLabel, FormControlLabelProps } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';

import { EventCreation } from 'client/modules/home-tasks/domain/calendar/calendar';
import { Icon } from 'client/shared/components/Icon';
import { useBreakpoint } from 'client/shared/hooks/useBreakpoint';

const TIMEPICKER_MAX_WIDTH = '80px';

type NewDateDialogTimeSelectorType = {
  dateData: DateSelectArg;
  isSameDay: boolean;
};

const NewDateDialogTimeSelector = ({ dateData: { allDay, start, end }, isSameDay }: NewDateDialogTimeSelectorType) => {
  const [isTimeVisible, setIsTimeVisible] = useState(!allDay);
  const { isMobile } = useBreakpoint();

  const { control, watch } = useFormContext<EventCreation>();

  const labelPlacementPosition: FormControlLabelProps['labelPlacement'] = isMobile ? 'end' : 'top';

  const startDayFormatted = format(start, 'EEEE, dd MMMM');
  const endDayFormatted = format(end, 'EEEE, dd MMMM');

  const dateText = !isSameDay ? `${startDayFormatted} - ${endDayFormatted}` : `${startDayFormatted} - ${startDayFormatted}`;

  const isAllDayEvent = !!watch('allDay');

  const handleClickShowTime = () => setIsTimeVisible(true);

  return (
    <Stack flexDirection="row" alignItems={!isTimeVisible ? 'center' : 'baseline'} gap={3}>
      <Icon icon={faClockEight} />
      <Stack gap={3}>
        <Stack flexDirection="row" alignItems="center" gap={3}>
          <Typography>{dateText}</Typography>
          {!isTimeVisible && (
            <Button variant="text" onClick={handleClickShowTime} sx={{ whiteSpace: 'nowrap' }}>
              Add time
            </Button>
          )}
        </Stack>
        {isTimeVisible && (
          <Stack flexDirection="row" alignItems="flex-end" flexWrap="wrap" gap={3}>
            <Controller
              name="allDay"
              control={control}
              render={({ field: { value, ...rest } }) => {
                return (
                  <FormControlLabel
                    {...rest}
                    label="All Day"
                    value={value}
                    control={<Checkbox checked={value} />}
                    labelPlacement={labelPlacementPosition}
                  />
                );
              }}
            />
            <Stack flexDirection="row" gap={3} paddingBottom={2}>
              <Controller
                name="start"
                control={control}
                render={({ field }) => {
                  return (
                    <TimePicker
                      {...field}
                      label="Start time"
                      ampm={false}
                      disabled={isAllDayEvent}
                      sx={{ maxWidth: TIMEPICKER_MAX_WIDTH }}
                    />
                  );
                }}
              />
              <Controller
                name="end"
                control={control}
                render={({ field }) => {
                  return (
                    <TimePicker
                      {...field}
                      label="End time"
                      ampm={false}
                      disabled={isAllDayEvent}
                      sx={{ maxWidth: TIMEPICKER_MAX_WIDTH }}
                    />
                  );
                }}
              />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export { NewDateDialogTimeSelector };
