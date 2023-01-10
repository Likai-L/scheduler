import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  const DayListItems = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      setDay={props.setDay}
      selected={day.name === props.day}
    />
  ));
  return <ul>{DayListItems}</ul>;
}

export default DayList;
