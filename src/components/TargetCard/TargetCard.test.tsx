import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import TargetCard from "./TargetCard";

describe("TargetCard", () => {
  test("renders the component", () => {
    render(<TargetCard isEditModeOn={true} Title="test2" />);
    expect(screen.getByText("test2")).toBeInTheDocument();
  });

  test("can the comp go in edit mode", () => {
    render(<TargetCard isEditModeOn={false} Title="test2" />);

    act(() => {
      render(<TargetCard isEditModeOn={true} Title="test2" />);
    });

    expect(screen.getByText("SAVE")).toBeInTheDocument();
  });

  test("validates input fields", () => {
    const { getByText, getByPlaceholderText } = render(
      <TargetCard isEditModeOn={true} Title="test2" />
    );
    const saveButton = getByText("SAVE");

    // Test for validation error when input is empty
    fireEvent.click(saveButton);
    expect(getByText("There must be an input")).toBeInTheDocument();

    //add input, so it doesn't interfere
    fireEvent.change(getByPlaceholderText("Humidity (%)"), {
      target: { value: "0" },
    });

    fireEvent.change(getByPlaceholderText("Time (hh:mm:ss)"), {
      target: { value: "24:00:00" },
    });

    // Test for validation error when temperature is out of range
    fireEvent.change(getByPlaceholderText("Temperature (°C)"), {
      target: { value: "101" },
    });
    fireEvent.click(saveButton);
    expect(
      getByText("Temperature must be between -20 and 100")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText("Temperature (°C)"), {
      target: { value: "-21" },
    });
    fireEvent.click(saveButton);
    expect(
      getByText("Temperature must be between -20 and 100")
    ).toBeInTheDocument();
  });

  test("validates input fields", () => {
    const { getByText, getByPlaceholderText } = render(
      <TargetCard isEditModeOn={true} Title="test2" />
    );
    const saveButton = getByText("SAVE");

    // Test for validation error when input is empty
    fireEvent.click(saveButton);
    expect(getByText("There must be an input")).toBeInTheDocument();

    //add input, so it doesn't interfere
    fireEvent.change(getByPlaceholderText("Temperature (°C)"), {
      target: { value: "10" },
    });

    fireEvent.change(getByPlaceholderText("Time (hh:mm:ss)"), {
      target: { value: "25:00:00" },
    });

    // Test for validation error when humidity is out of range
    fireEvent.change(getByPlaceholderText("Humidity (%)"), {
      target: { value: "101" },
    });
    fireEvent.click(saveButton);
    expect(getByText("Humidity must be between 0 and 100")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText("Humidity (%)"), {
      target: { value: "-1" },
    });
    fireEvent.click(saveButton);
    expect(getByText("Humidity must be between 0 and 100")).toBeInTheDocument();
  });

  test("validates input fields", () => {
    const { getByText, getByPlaceholderText } = render(
      <TargetCard isEditModeOn={true} Title="test2" />
    );
    const saveButton = getByText("SAVE");

    // Test for validation error when input is empty
    fireEvent.click(saveButton);
    expect(getByText("There must be an input")).toBeInTheDocument();

    //add input, so it doesn't interfere
    fireEvent.change(getByPlaceholderText("Temperature (°C)"), {
      target: { value: "10" },
    });
    fireEvent.change(getByPlaceholderText("Humidity (%)"), {
      target: { value: "50" },
    });

    fireEvent.change(getByPlaceholderText("Time (hh:mm:ss)"), {
      target: { value: "25:00:00" },
    });
    fireEvent.click(saveButton);
    expect(
      getByText("Time must be between 00:00:00 and 24:00:00")
    ).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText("Time (hh:mm:ss)"), {
      target: { value: "10000000" },
    });
    fireEvent.click(saveButton);
    expect(getByText("Time is not the right format")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText("Time (hh:mm:ss)"), {
      target: { value: "15:0g:00" },
    });
    fireEvent.click(saveButton);
    expect(getByText("Not a number")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText("Time (hh:mm:ss)"), {
      target: { value: "15:70:00" },
    });

    fireEvent.click(saveButton);
    expect(getByText("Minutes must be between 00 and 60")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText("Time (hh:mm:ss)"), {
      target: { value: "15:00:70" },
    });
    fireEvent.click(saveButton);
    expect(getByText("Seconds must be between 00 and 60")).toBeInTheDocument();
  });

  test("is useState null after change", () => {
    //get button
    const { getByText, getByPlaceholderText } = render(
      <TargetCard isEditModeOn={true} Title="test2" />
    );
    const saveButton = getByText("SAVE");

    //set values
    fireEvent.change(getByPlaceholderText("Temperature (°C)"), {
      target: { value: "101" },
    });
    fireEvent.change(getByPlaceholderText("Humidity (%)"), {
      target: { value: "123" },
    });
    fireEvent.change(getByPlaceholderText("Time (hh:mm:ss)"), {
      target: { value: "12:10:02" },
    });

    //remove values
    fireEvent.change(getByPlaceholderText("Temperature (°C)"), {
      target: { value: "" },
    });
    fireEvent.change(getByPlaceholderText("Humidity (%)"), {
      target: { value: "" },
    });
    fireEvent.change(getByPlaceholderText("Time (hh:mm:ss)"), {
      target: { value: "" },
    });

    //button press
    fireEvent.click(saveButton);

    //expect
    expect(getByText("There must be an input")).toBeInTheDocument();
  });
});
