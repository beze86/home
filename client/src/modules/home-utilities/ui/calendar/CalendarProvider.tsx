import { createContext, FC, PropsWithChildren, useContext } from 'react';

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
