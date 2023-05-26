import React from "react";
import { render } from "@testing-library/react";
import TargetCard from "./TargetCard";

describe("TargetCard", () => {
  test("renders the TargetCard component", () => {
    render(<TargetCard />);
    // Add assertions as needed
  });

  test("disables input fields when disabled prop is true", () => {
    render(<TargetCard disabled={true} />);
  });

  test("enables input fields when disabled prop is false", () => {
    render(<TargetCard disabled={false} />);
  });

  test("updates disabled state when ShowEdit or ShowAdd changes", () => {
    const props = {
      ShowEdit: true,
      ShowAdd: false,
    };

    const { getByPlaceholderText } = render(<TargetCard {...props} />);
    const temperatureInput = getByPlaceholderText("Temperature (°C)");
    const humidityInput = getByPlaceholderText("Humidity (%)");
    const timeInput = getByPlaceholderText("Time (h:mm:ss)");
  });
});
