import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EditValues from "./EditValues";

describe("EditValues", () => {
  test("renders the component", () => {
    render(<EditValues />);
    expect(screen.getByText("Edit Values")).toBeInTheDocument();
  });

  test("validates input fields (temperature)", () => {
    const { getByText, getByPlaceholderText } = render(<EditValues />);
    const saveButton = getByText("SAVE");

    // Test for validation error when input is empty
    fireEvent.click(saveButton);
    expect(getByText("There must be an input")).toBeInTheDocument();

    //add input, so it doesn't interfere
    fireEvent.change(getByPlaceholderText("Humidity (%)"), { target: { value: "0" } });

    // Test for validation error when temperature is out of range
    fireEvent.change(getByPlaceholderText("Temperature (°C)"), { target: { value: "101" } });
    fireEvent.click(saveButton);
    expect(getByText("Temperature must be between -20 and 100")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText("Temperature (°C)"), { target: { value: "-21" } });
    fireEvent.click(saveButton);
    expect(getByText("Temperature must be between -20 and 100")).toBeInTheDocument();
  });

  test("validates input fields (humidity)", () => {
    const { getByText, getByPlaceholderText } = render(<EditValues />);
    const saveButton = getByText("SAVE");

    // Test for validation error when input is empty
    fireEvent.click(saveButton);
    expect(getByText("There must be an input")).toBeInTheDocument();

    //add input, so it doesn't interfere
    fireEvent.change(getByPlaceholderText("Temperature (°C)"), { target: { value: "10" } });

    // Test for validation error when humidity is out of range
    fireEvent.change(getByPlaceholderText("Humidity (%)"), { target: { value: "101" } });
    fireEvent.click(saveButton);
    expect(getByText("Humidity must be between 0 and 100")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText("Humidity (%)"), { target: { value: "-1" } });
    fireEvent.click(saveButton);
    expect(getByText("Humidity must be between 0 and 100")).toBeInTheDocument();
  });

  test("is useState null after change", () => {
    //get button
    const { getByText, getByPlaceholderText } = render(<EditValues />);
    const saveButton = getByText("SAVE");

    //set values
    fireEvent.change(getByPlaceholderText("Temperature (°C)"), { target: { value: "101" } });
    fireEvent.change(getByPlaceholderText("Humidity (%)"), { target: { value: "123" } });

    //remove values
    fireEvent.change(getByPlaceholderText("Temperature (°C)"), { target: { value: "" } });
    fireEvent.change(getByPlaceholderText("Humidity (%)"), { target: { value: "" } });

    //button press
    fireEvent.click(saveButton);

    //expect
    expect(getByText("There must be an input")).toBeInTheDocument();
  });
});
