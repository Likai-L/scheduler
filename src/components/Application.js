import React from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import axios from "axios";

import { getAppointmentsForDay } from "helpers/selectors";

const { useState, useEffect } = React;

export default function Application(props) {
  const [state, setState] = useState({
    days: [],
    appointments: {},
    day: "Monday",
  });

  const setDay = (day) => {
    setState({ ...state, day: day });
  };
  const baseUrl = "/api";
  const requestDays = axios.get(`${baseUrl}/days`);
  const requestAppointments = axios.get(`${baseUrl}/appointments`);

  const promises = [requestDays, requestAppointments];

  useEffect(() => {
    Promise.all(promises).then((responses) => {
      setState((prev) => ({
        ...prev,
        days: responses[0].data,
        appointments: responses[1].data,
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Object.values(getAppointmentsForDay(state, state.day)).map(
          (appointment) => {
            return <Appointment key={appointment.id} {...appointment} />;
          }
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
