import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
  getByTestId,
  prettyDOM,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    const add = getByAltText(appointment, "Add");
    fireEvent.click(add);
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving..."));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find((node) =>
      queryByText(node, "Monday")
    );
    expect(queryByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find((node) =>
      queryByText(node, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(
        appointment,
        "Are you sure you want to cancel this appointment?"
      )
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(queryByText(appointment, "Deleting...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      getByText(appointment, "Deleting...")
    );
    const day = getAllByTestId(container, "day").find((node) =>
      queryByText(node, "Monday")
    );
    expect(queryByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find((node) =>
      queryByText(node, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lana Del Rey" },
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(queryByText(appointment, "Saving...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving..."));
    expect(getByText(appointment, "Lana Del Rey")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find((node) =>
      queryByText(node, "Monday")
    );
    expect(queryByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find((node) =>
      queryByText(node, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lana Del Rey" },
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(queryByText(appointment, "Saving...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving..."));
    expect(
      getByText(appointment, "Could not book this appointment.")
    ).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find((node) =>
      queryByText(node, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(
      getByText(
        appointment,
        "Are you sure you want to cancel this appointment?"
      )
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(queryByText(appointment, "Deleting...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      getByText(appointment, "Deleting...")
    );
    expect(
      getByText(appointment, "Could not cancel this appointment.")
    ).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});
