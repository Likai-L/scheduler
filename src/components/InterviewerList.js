import React from "react";
import PropTypes from "prop-types";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => {
          props.onChange(interviewer.id);
        }}
        selected={interviewer.id === props.value}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
