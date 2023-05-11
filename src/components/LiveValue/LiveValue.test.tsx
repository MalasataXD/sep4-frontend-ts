import { render, screen } from "@testing-library/react";
import LiveStats from "./LiveValue";

test("renders temperature, humidity, and carbon sections", async () => {
  render(<LiveStats />);

  const mockData = [
    { temp: "25", humidity: "45", co2: "500" },
    { temp: "26", humidity: "50", co2: "600" },
  ];

  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    json: async () => mockData,
    ok: true,
  } as Response);

  const temperature = await screen.findByText(`${mockData[0]?.temp} °C`);
  const humidity = await screen.findByText(`${mockData[0]?.humidity} %`);
  const carbon = await screen.findByText(`${mockData[0]?.co2} %`);

  expect(temperature).toBeInTheDocument();
  expect(humidity).toBeInTheDocument();
  expect(carbon).toBeInTheDocument();

  jest.restoreAllMocks();
});
