import { parseISO } from 'date-fns';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

import { EventInput } from '@fullcalendar/core';
import { useQuery } from '@tanstack/react-query';

import { calendarApi } from 'client/modules/calendar/api/calendar';
import { CalendarEvent } from 'client/modules/calendar/domain/calendar';

type CalendarContextType = {
  dateView: {
    isAllDay: boolean;
    typeView: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
    start: string;
    end: string;
  };
};

const calendarDefaultValues: CalendarContextType = {
  dateView: {
    isAllDay: true,
    typeView: 'dayGridMonth',
    start: '',
    end: '',
  },
};

const CalendarContext = createContext<CalendarContextType>(calendarDefaultValues);

const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('useCalendarContext has to be used in its contextProvider');
  }

  return context;
};

const CalendarProvider: FC<PropsWithChildren> = ({ children }) => {
  return <CalendarContext.Provider value={calendarDefaultValues}>{children}</CalendarContext.Provider>;
};

export { CalendarProvider, useCalendarContext };
