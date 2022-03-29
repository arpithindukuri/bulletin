import * as React from "react";
import { useCallback, useState } from "react";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import type { Event } from "../../../types";
import "./ShowCalendar.css";
import axiosInstance from "../axios";
import { useParams } from "react-router-dom";

interface ShowCalendarProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const ShowCalendar = ({ events, setEvents }: ShowCalendarProps) => {
  const params = useParams();
  const [defaultView, setDefaultView] = useState("dayGridMonth");

  // const handleEvents = useCallback(
  //   (events: EventApi[]) => setCurrentEvents(events),
  //   []
  // );

  // const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
  //   let description = prompt(
  //     "Date: " +
  //       selectInfo.start +
  //       "\n" +
  //       "Please enter the description of the event"
  //   )?.trim();
  //   let calendarApi = selectInfo.view.calendar;
  //   calendarApi.unselect();
  //   if (description) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       description,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     });
  //   }
  // }, []);

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (
      window.confirm(
        `This event ${clickInfo.event.title}. Do you want to delete?`
      )
    ) {
      clickInfo.event.remove();
      axiosInstance
        .delete("/deleteEvent", {
          params: { boardID: params.board_id, eventID: clickInfo.event.id },
        })
        .then((res) => {
          console.log("delete event response is: ", res);
          const index = events.findIndex(
            (x: Event) => x.id === clickInfo.event.id
          );
          if (index > -1) {
            events.splice(index, 1);
            setEvents([...events]);
          }
        })
        .catch((err) => {
          console.log("delete event error is: ", err);
        });
    }
  }, []);

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView={defaultView}
          selectable={true}
          editable={false}
          events={events.map((e) => ({
            ...e,
            id: e.id === null ? undefined : e.id,
          }))}
          locales={allLocales}
          locale="eng"
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default ShowCalendar;
