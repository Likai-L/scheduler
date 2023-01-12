import React from "react";

import "components/Application.scss";

import DayList from "./DayList";

import Appointment from "./Appointment";

import axios from "axios";

import { getAppointmentsForDay, getInterview } from "helpers/selectors";

const { useState, useEffect } = React;

export default function Application(props) {
  const [state, setState] = useState({
    days: [],
    appointments: {},
    day: "Monday",
    interviewers: {},
  });

  const setDay = (day) => {
    setState({ ...state, day: day });
  };
  const baseUrl = "/api";
  const requestDays = axios.get(`${baseUrl}/days`);
  const requestAppointments = axios.get(`${baseUrl}/appointments`);
  const requestInterviewers = axios.get(`${baseUrl}/interviewers`);
  const schedule = Object.values(getAppointmentsForDay(state, state.day)).map(
    (appointment) => {
      const interviewInfo = getInterview(state, appointment.interview);
      const { interview, ...others } = appointment;
      return (
        <Appointment
          key={appointment.id}
          interview={interviewInfo}
          {...others}
        />
      );
    }
  );

  const promises = [requestDays, requestAppointments, requestInterviewers];

  useEffect(() => {
    Promise.all(promises).then((responses) => {
      console.log(responses[2].data);
      setState((prev) => ({
        ...prev,
        days: responses[0].data,
        appointments: responses[1].data,
        interviewers: responses[2].data,
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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
