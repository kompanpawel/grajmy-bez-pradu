import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.scss";

const Calendar: React.FC<any> = () => {
  const [events, setEvents] = useState([]);



  const calendarComponentRef = () => React.createRef();

  return (
    <div className="calendar">
      <div className="calendar-main">
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridDay",
          }}
          ref={calendarComponentRef}
          height="auto"
        />
      </div>
    </div>
  );
};

export default React.memo(Calendar);
