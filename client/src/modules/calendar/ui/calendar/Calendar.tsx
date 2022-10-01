import React from 'react';

/* eslint import/order: ["error", {"alphabetize": {"order": "desc"}}] */

import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

export const Calendar = () => {
  return <FullCalendar height="100vh" plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
};
