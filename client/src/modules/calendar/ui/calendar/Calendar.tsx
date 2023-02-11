import React from 'react';

/* eslint import/order: ["error", {"alphabetize": {"order": "desc"}}] */

import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import { Page } from 'client/shared/layouts/Page/Page'; // a plugin!

export const Calendar = () => {
  return (
    <Page>
      <Page.Main>
        <FullCalendar height="100vh" plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </Page.Main>
    </Page>
  );
};
