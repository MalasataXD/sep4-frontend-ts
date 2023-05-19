import React, { useEffect, useState } from "react";
import styles from "./LiveValue.module.css";
import { GetData, LINK } from "../config";

export default function LiveStats() {
  const [Temperature, setTemperature] = useState("0");
  const [Humidity, setHumidity] = useState("0");
  const [Carbon, setCarbon] = useState("0");
  const [LastUpdate, setLastUpdate] = useState("0");
  let HasConnection: boolean = false;

  // # Type for the incoming data from the API
  interface APIData {
    id: number;
    temp: string;
    humidity: string;
    co2: string;
    timestamp: string;
  }

  useEffect(() => {
    // NOTE: Set a timeout to call fetchData after 2 minutes (120000 milliseconds)v
    const fetchTimeout = setTimeout(() => {
      fetchData();
    }, 120000);

    fetchData(); // ¤ Fetches data immediately when the component is loaded

    // NOTE: Return a cleanup function to clear the timeout when the component is unmounted
    return () => {
      clearTimeout(fetchTimeout);
    };
  }, []);

  function switchConnection(): void {
    // NOTE: Fetch the connection status
    const connectionSection = document.querySelector(".connection");
    if (connectionSection) {
      connectionSection.classList.toggle(
        `${styles.connectionUp}`,
        HasConnection
      );
      connectionSection.classList.toggle(
        `${styles.connectionDown}`,
        !HasConnection
      );
    }
  }

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
      setLastUpdate(data[0].timestamp.split(" ", 2)[1]); // Splits the time from the date.
      HasConnection = true;
      // # Set the connection status
    } catch (Error) {
      // # Indicate that we couldn't fetch from API
      console.error(Error);
      HasConnection = false;
    } finally {
      switchConnection();
    }
  }

  // ¤ JSX
  return (
    <div className={styles.container}>
      <h3 id={styles.header}>LIVE</h3>
      <div className={`${styles.section} ${styles.zoom} ${styles.temperature}`}>
        <div className={styles.title}>
          <b>Temperature</b>
        </div>
        <div>{Temperature} °C</div>
      </div>

      <div className={`${styles.section} ${styles.zoom} ${styles.humidity}`}>
        <div className={styles.title}>
          <b>Humidity</b>
        </div>
        <div>{Humidity} %</div>
      </div>

      <div className={`${styles.section} ${styles.zoom} ${styles.carbon}`}>
        <div className={`${styles.title} ${styles.tooltip}`}>
          <b>C0₂</b>
          <span className={styles.tooltiptext}>100% = 5000 ppm</span>
        </div>
        <div>{Carbon} %</div>
      </div>

      <div className={`${styles.section} ${styles.time}`}>
        <div className={styles.title}>
          <b>Last Update</b>
        </div>
        <div>{LastUpdate} </div>
      </div>
      <div className={`${styles.section} connection`}>
        <div className={styles.title}>
          <b>STATUS</b>
        </div>
      </div>
    </div>
  );
}
