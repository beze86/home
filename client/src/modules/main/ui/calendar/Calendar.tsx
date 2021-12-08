import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export const Calendar = () => {
    return (
      <FullCalendar
        height="100vh"
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
    )
}