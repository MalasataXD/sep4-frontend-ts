import React from "react";
import { useState, useEffect } from "react";
import "./LiveValue.css";
import { GetData, LINK } from "../config";

export default function LiveStats() {
  const [Temperature, setTemperature] = useState("0");
  const [Humidity, setHumidity] = useState("0");
  const [Carbon, setCarbon] = useState("0");
  const [LastUpdate, setLastUpdate] = useState("0");

  // # Type for the incoming data from the API
  interface APIData {
    id: number;
    temp: string;
    humidity: string;
    co2: string;
    timestamp: string;
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 120000); // NOTE: Waits 2 minutes between each fetch.
  }, []);

  fetchData();

  async function fetchData(): Promise<void> {
    try {
      // # Makes a request to the API to get the latest data

      const response: Response = await fetch(LINK + GetData, {
        mode: "cors",
      });
      // ! If something went wrong --> Throw an Error.
      if (!response.ok) {
        throw new Error("Could not get information from API...");
      }

      const data: APIData[] = await response.json(); // # Convert from JSON to APIData Object

      // NOTE: Split the data into the correct displays.
      setTemperature(data[0].temp);
      setHumidity(data[0].humidity);
      setCarbon(data[0].co2);

      setLastUpdate(data[0].timestamp.split(" ", 2)[1]);

      // TEMP: This would be removed, when the "GetLastest" method is implemented on Cloud
    } catch (Error) {
      setLastUpdate("Could not get information from API...");
    }
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

      <div className="section time">
        <div className="title">
          <b>Last Update</b>
        </div>
        <div>{LastUpdate} </div>
      </div>
    </div>
  );
}
