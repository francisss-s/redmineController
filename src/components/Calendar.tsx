import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

interface TimeEntry {
  id: number;
  project: {
    id: number;
    name: string;
  };
  issue: {
    id: number;
  };
  user: {
    id: number;
    name: string;
  };
  activity: {
    id: number;
    name: string;
  };
  hours: number;
  comments: string;
  spent_on: string; // Fecha en formato YYYY-MM-DD
  created_on: string; // Fecha en formato ISO 8601
  updated_on: string; // Fecha en formato ISO 8601
}

interface CalendarProps {
  timeEntries: TimeEntry[];
}

const Calendar: React.FC<CalendarProps> = ({ timeEntries }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimeEntry | null>(null);

  // Mapea los datos de timeEntries a eventos para FullCalendar
  const events = timeEntries.map((entry) => ({
    id: entry.id.toString(),
    title: entry.project.name,
    start: entry.spent_on,
    hours: entry.hours,
    activity: entry.activity.name,
    user: entry.user.name,
    comments: entry.comments,
    issueId: entry.issue.id,
    createdOn: entry.created_on,
    updatedOn: entry.updated_on,
  }));

  const handleEventClick = (info: any) => {
    const event = info.event;
    const selected = timeEntries.find(
      (entry) => entry.id.toString() === event.id
    );
    if (selected) {
      setSelectedEvent(selected);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null); // Cierra el modal
  };
  const totalHoursByDate = timeEntries.reduce((acc, entry) => {
    const date = entry.spent_on;
    acc[date] = (acc[date] || 0) + entry.hours;
    return acc;
  }, {} as Record<string, number>);
  return (
    <div className="bg-white shadow rounded p-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        firstDay={1} // Configura el lunes como el primer día de la semana
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        eventClick={handleEventClick}
        dayCellContent={(args) => {
          const date = args.date.toISOString().split("T")[0]; // Formatea la fecha como YYYY-MM-DD
          const totalHours = totalHoursByDate[date] || 0;

          return (
            <div className="flex  items-center">
              {totalHours > 0 && (
                <span className="text-xs text-blue-600 font-semibold mr-5">
                  Total {totalHours}h
                </span>
              )}
              <span>{args.dayNumberText}</span> {/* Número del día */}
            </div>
          );
        }}
        eventContent={(arg) => {
          const hours = arg.event.extendedProps.hours;
          const activity = arg.event.extendedProps.activity;
          const issueId = arg.event.extendedProps.issueId;

          return (
            <div className="bg-white shadow-sm rounded-lg p-2">
                {/* <span className="block text-sm font-bold text-blue-700">{arg.event.title}</span> */}
                <span className="block text-xs text-gray-600">{activity}</span>
                <span className="block text-xs text-gray-600">{hours}h</span>
            </div>
          );
        }}
        eventClassNames={(arg) => {
            const activity = arg.event.extendedProps.activity;
            switch (activity) {
                case "Desarrollo Software - BackEnd":
                return "bg-green-500"; // Verde
                case "Desarrollo Software - FrontEnd":
                return "bg-blue-500"; // Azul
                case "Reunión":
                return "bg-yellow-500"; // Amarillo
                default:
                return "bg-gray-500"; // Gris
            }
        }}
        eventTextColor="#ffffff"
      />

      {/* Modal para mostrar información adicional */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">
              {selectedEvent.project.name}
            </h2>
            <p>
              <strong>Activity:</strong> {selectedEvent.activity.name}
            </p>
            <p>
              <strong>User:</strong> {selectedEvent.user.name}
            </p>
            <p>
              <strong>Hours:</strong> {selectedEvent.hours}
            </p>
            <p>
              <strong>Comments:</strong>{" "}
              {selectedEvent.comments || "No comments"}
            </p>
            <p>
              <strong>Created On:</strong>{" "}
              {new Date(selectedEvent.created_on).toLocaleString()}
            </p>
            <p>
              <strong>Updated On:</strong>{" "}
              {new Date(selectedEvent.updated_on).toLocaleString()}
            </p>
            <p>
              <strong>Issue:</strong>{" "}
              <a
                href={`https://redmine.wing.cl/issues/${selectedEvent.issue.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                #{selectedEvent.issue.id}
              </a>
            </p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
