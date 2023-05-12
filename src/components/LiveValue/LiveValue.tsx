import React from "react";
import { useState, useEffect } from "react";
import "./LiveValue.css";
import { GetData, LINK } from "../config";

export default function LiveStats() {
  const [Temperature, setTemperature] = useState("20");
  const [Humidity, setHumidity] = useState("20");
  const [Carbon, setCarbon] = useState("13");
  const [Counter, setCounter] = useState(0);

  // # Type for the incoming data from the API
  interface APIData {
    temp: string;
    humidity: string;
    co2: string;
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 120000); // NOTE: Waits 2 minutes between each fetch.
  }, [Counter]);

  async function fetchData(): Promise<void> {
    // # Makes a request to the API to get the latest data
    const response: Response = await fetch(LINK + GetData, { mode: "cors" });
    // ! If something went wrong --> Throw an Error.
    if (!response.ok) {
      throw new Error("Could not get information from API...");
    }

    const data: APIData[] = await response.json(); // # Convert from JSON to APIData Object

    // NOTE: Split the data into the correct displays.
    setTemperature(data[Counter]?.temp);
    setHumidity(data[Counter]?.humidity);
    setCarbon(data[Counter]?.co2);

    // TEMP: This would be removed, when the "GetLastest" method is implemented on Cloud
    let counter: number = Counter + 1;
    setCounter(counter);
  }

  // ¤ JSX
  return (
    <div className="container">
      <h3>LIVE</h3>
      <div className="section temperature">
        <div className="title">
          <b>Temperature</b>
        </div>
        <div>{Temperature} °C</div>
      </div>

      <div className="section humidity">
        <div className="title">
          <b>Humidity</b>
        </div>
        <div>{Humidity} %</div>
      </div>

      <div className="section carbon">
        <div className="title">
          <b>C0₂</b>
        </div>
        <div>{Carbon} %</div>
      </div>
    </div>
  );
}
