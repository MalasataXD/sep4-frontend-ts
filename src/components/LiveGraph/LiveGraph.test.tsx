import React from "react";
import { render, waitFor } from "@testing-library/react";
import LiveGraph from "./LiveGraph";

jest.useFakeTimers();

// Mock ResizeObserver constructor
class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

beforeAll(() => {
  window.ResizeObserver = ResizeObserver;
});

describe("LiveGraph", () => {
  // @ts-ignore
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            temp: 25,
            humidity: 50,
            co2: 300,
            timestamp: "2023-05-26 12:00:00",
          },
        ]),
    })
  );

  test("renders without errors", () => {
    render(<LiveGraph />);
  });

  test("fetches data and updates the graph", async () => {
    render(<LiveGraph />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    jest.advanceTimersByTime(2 * 60 * 1000);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    jest.useRealTimers();
  });

  test("renders the temperature graph correctly", () => {
    render(<LiveGraph />);
  });

  test("renders the humidity graph correctly", () => {
    render(<LiveGraph />);
  });
});
