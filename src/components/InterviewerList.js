import React, { useInsertionEffect } from "react";

import "./InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
  const Interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => {
          props.setInterviewer(interviewer.id);
        }}
        selected={props.interviewer === interviewer.id}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{Interviewers}</ul>
    </section>
  );
}

export default InterviewerList;
