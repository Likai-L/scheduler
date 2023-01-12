export function getAppointmentsForDay(state, day) {
  const selectedDayInfo = state.days.filter(
    (dayInfo) => dayInfo.name === day
  )[0];
  if (!selectedDayInfo) return [];
  const appointments = selectedDayInfo.appointments.map((interviewId) => {
    return state.appointments[interviewId];
  });
  return appointments;
}
