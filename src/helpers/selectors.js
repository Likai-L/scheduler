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

export function getInterview(state, interview) {
  if (!interview || !interview.interviewer) return null;
  const interviewerId = interview.interviewer;
  const interviewersArray = Object.values(state.interviewers);
  const interviewerInfo = interviewersArray.filter(
    (interviewer) => interviewer.id === interviewerId
  )[0];
  if (!interviewerInfo) return null;
  return {
    ...interview,
    interviewer: interviewerInfo,
  };
}
