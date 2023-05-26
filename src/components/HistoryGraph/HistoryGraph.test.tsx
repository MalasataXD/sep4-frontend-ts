import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HistoryGraph from "./HistoryGraph";

// Mock the ResizeObserver constructor
class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

// Mock the global.ResizeObserver property
global.ResizeObserver = ResizeObserver;
jest.mock("../config", () => ({
  GetData: "getData",
  LINK: "https://example.com/",
}));
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

const mockFetch = (
  data: {
    id: number;
    temp: number;
    humidity: number;
    co2: number;
    timestamp: string;
  }[]
) =>
  jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(data),
  });

describe("HistoryGraph", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without errors", () => {
    render(<HistoryGraph />);
  });

  test("fetches data and updates the graphs", async () => {
    global.fetch = mockFetch([
      {
        id: 1,
        temp: 25,
        humidity: 50,
        co2: 300,
        timestamp: "2023-05-26 12:00:00",
      },
    ]);

    render(<HistoryGraph />);

    const startDateInput = screen.getByLabelText("Start Date");
    const startTimeInput = screen.getByLabelText("Start Time");
    const endDateInput = screen.getByLabelText("End Date");
    const endTimeInput = screen.getByLabelText("End Time");
    const searchButton = screen.getByText("SEARCH");

    fireEvent.change(startDateInput, { target: { value: "2023-05-25" } });
    fireEvent.change(startTimeInput, { target: { value: "10:00" } });
    fireEvent.change(endDateInput, { target: { value: "2023-05-26" } });
    fireEvent.change(endTimeInput, { target: { value: "12:00" } });
    fireEvent.click(searchButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });
});
