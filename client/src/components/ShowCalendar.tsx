import { useCallback, useState } from "react";
import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import "./ShowCalendar.css";

function App() {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleEvents = useCallback(
    (events: EventApi[]) => setCurrentEvents(events),
    []
  );
  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    let description = prompt("Date: " + selectInfo.start + "\n" +  "Please enter the description of the event")?.trim();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (description) {
      calendarApi.addEvent({
        id: createEventId(),
        description,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }, []);
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (
      window.confirm(`This event ${clickInfo.event.title}. Do you want to delete?`)
    ) {
      clickInfo.event.remove();
    }
  }, []);
  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          initialEvents={INITIAL_EVENTS}
          locales={allLocales}
          locale="eng"
          eventsSet={handleEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
}

export default App;
