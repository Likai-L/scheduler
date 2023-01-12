export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter((dayInfo) => dayInfo.name === day)[0];
  if (!selectedDay) return [];
  const appointments = selectedDay.appointments.map((interviewId) => {
    return state.appointments[interviewId];
  });
  return appointments;
}
