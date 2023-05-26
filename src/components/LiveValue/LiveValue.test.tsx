import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import LiveStats from "./LiveValue";

// Mock API response
const mockData = [
  {
    id: 1,
    temp: "25",
    humidity: "50",
    co2: "1000",
    timestamp: "2023-05-26 10:00:00",
  },
];

let container: HTMLElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

describe("LiveStats component", () => {
  it("renders without crashing", async () => {
    // @ts-ignore
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    await act(async () => {
      render(<LiveStats />, container);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for data update
    });

    expect(container?.querySelector(".container")).toBeTruthy();
  });

  it("displays the temperature", async () => {
    // @ts-ignore
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    await act(async () => {
      render(<LiveStats />, container);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for data update
    });

    expect(container?.querySelector(".temperature")?.textContent).toContain(
      "Temperature"
    );
    expect(container?.querySelector(".temperature")?.textContent).toContain(
      "25"
    );
  });

  it("displays the humidity", async () => {
    // @ts-ignore
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    await act(async () => {
      render(<LiveStats />, container);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for data update
    });

    expect(container?.querySelector(".humidity")?.textContent).toContain(
      "Humidity"
    );
    expect(container?.querySelector(".humidity")?.textContent).toContain("50");
  });

  it("displays the CO2 level", async () => {
    // @ts-ignore
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    await act(async () => {
      render(<LiveStats />, container);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for data update
    });

    expect(container?.querySelector(".carbon")?.textContent).toContain("C0₂");
    expect(container?.querySelector(".carbon")?.textContent).toContain(
      "1000 PPM"
    );
  });

  it("displays the last update time", async () => {
    // @ts-ignore
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    await act(async () => {
      render(<LiveStats />, container);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for data update
    });

    expect(container?.querySelector(".time")?.textContent).toContain(
      "Last Update"
    );
    expect(container?.querySelector(".time")?.textContent).toContain(
      "10:00:00"
    );
  });
});
