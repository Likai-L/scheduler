import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    days: [],
    appointments: {},
    day: "Monday",
    interviewers: {},
  });

  const requestDays = axios.get(`api/days`);
  const requestAppointments = axios.get(`api/appointments`);
  const requestInterviewers = axios.get(`api/interviewers`);

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

  const setDay = (day) => {
    setState({ ...state, day: day });
  };

  const updateSpots = () => {
    const newDays = state.days.map((day) => {
      const appointmentsData = getAppointmentsForDay(state, day.name);
      const spots = appointmentsData.filter(
        (appointment) => appointment.interview
      ).length;
      return { ...day, spots };
    });
    setState({ ...state, days: newDays });
  };
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments });
      updateSpots();
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments: {
          ...state.appointments,
          [id]: { ...state.appointments[id], interview: null },
        },
      });
      updateSpots();
    });
  };
  return { state, setDay, bookInterview, cancelInterview };
}
