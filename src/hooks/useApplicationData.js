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

  const requestDays = axios.get(`/api/days`);
  const requestAppointments = axios.get(`/api/appointments`);
  const requestInterviewers = axios.get(`/api/interviewers`);

  const promises = [requestDays, requestAppointments, requestInterviewers];

  useEffect(() => {
    Promise.all(promises).then((responses) => {
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

  const updateSpots = (prev) => {
    const newDays = prev.days.map((day) => {
      const appointmentsData = getAppointmentsForDay(prev, day.name);
      const spots = appointmentsData.filter(
        (appointment) => appointment.interview === null
      ).length;
      return { ...day, spots };
    });
    console.log(newDays);
    return { ...prev, days: newDays, overwriting: 1 };
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState((prev) => ({ ...prev, appointments, overwriting: 0 }));
      setState((prev) => {
        console.log(updateSpots(prev).days);
        return updateSpots(prev);
      });
    });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => {
        return {
          ...prev,
          appointments: {
            ...prev.appointments,
            [id]: { ...prev.appointments[id], interview: null },
          },
        };
      });
      setState((prev) => {
        console.log(prev.appointments);
        return updateSpots(prev);
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
