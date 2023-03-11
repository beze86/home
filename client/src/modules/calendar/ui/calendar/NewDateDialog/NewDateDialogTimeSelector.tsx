import { differenceInBusinessDays, format } from 'date-fns';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TimePicker, { TimePickerValue } from 'react-time-picker';

import { faClockEight } from '@fortawesome/pro-regular-svg-icons';
import { DateSelectArg } from '@fullcalendar/core';
import { Button, Stack, Typography, Checkbox, FormControlLabel, FormControlLabelProps } from '@mui/material';

import { EventCreation } from 'client/modules/calendar/domain/calendar';
import { Icon } from 'client/shared/components/Icon';
import { useBreakpoint } from 'client/shared/hooks/useBreakpoint';

type NewDateDialogTimeSelectorType = {
  dateData: DateSelectArg;
  onChangeStart: (hour: TimePickerValue) => void;
  onChangeEnd: (hour: TimePickerValue) => void;
};

const NewDateDialogTimeSelector = ({ dateData: { start, end }, onChangeStart, onChangeEnd }: NewDateDialogTimeSelectorType) => {
  const [isTimeVisible, setIsTimeVisible] = useState(false);
  const { isMobile } = useBreakpoint();

  const { control, watch } = useFormContext<EventCreation>();

  const labelPlacementPosition: FormControlLabelProps['labelPlacement'] = isMobile ? 'end' : 'top';

  const startDayFormatted = format(start, 'EEEE, dd MMMM');
  const endDayFormatted = format(end, 'EEEE, dd MMMM');

  const isSameDay = differenceInBusinessDays(end, start) === 1;

  const dateText = !isSameDay ? `${startDayFormatted} - ${endDayFormatted}` : startDayFormatted;

  const isAllDayEvent = !!watch('allDay');

  const handleClickShowTime = () => setIsTimeVisible(true);

  return (
    <Stack flexDirection="row" alignItems="baseline" gap={3}>
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
                return <FormControlLabel {...rest} label="All Day" value={value} control={<Checkbox checked={value} />} labelPlacement={labelPlacementPosition} />;
              }}
            />
            <Stack flexDirection="row" gap={3} paddingBottom={2}>
              <Controller
                name="start"
                control={control}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <TimePicker
                      {...rest}
                      disabled={isAllDayEvent}
                      disableClock
                      onChange={(value) => {
                        onChangeStart(value);
                        onChange(value);
                      }}
                    />
                  );
                }}
              />
              <Controller
                name="end"
                control={control}
                render={({ field: { onChange, ...rest } }) => {
                  return (
                    <TimePicker
                      {...rest}
                      disabled={isAllDayEvent}
                      disableClock
                      onChange={(value) => {
                        onChangeEnd(value);
                        onChange(value);
                      }}
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
