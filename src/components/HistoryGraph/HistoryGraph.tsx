import styles from "./HistoryGraph.module.css";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect, useRef } from "react";
import { GetData, LINK } from "../config";
import { useNavigate } from "react-router-dom";

//Import icons
import redCalendarIcon from "../../img/icons/redCalendar.png";
import redClockIcon from "../../img/icons/redClock.png";

import blueCalendarIcon from "../../img/icons/blueCalendar.png";
import blueClockIcon from "../../img/icons/blueClock.png";
import LoginHandler from "../../components/login";

export default function HistoryGraph() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!LoginHandler.isLoggedIn()) {
      navigate("/login");
    }
  }, []);

  const [GraphData, setGraphData] = useState<APIData[]>([]);

  const [errorState, setErrorState] = useState<string>("");
  let hideErrorState: boolean = true;

  const startDateRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  interface APIData {
    id: number;
    temp: number;
    humidity: number;
    co2: number;
    timestamp: string;
  }

  enum PPMCalc {
    PPM_MAX = 5000,
  }

  // # Toggles the Error message at the bottom of the component.
  function toggleErrorState() {
    const connectionSection = document.getElementById("errorState");
    if (connectionSection) {
      connectionSection.classList.toggle(`${styles.hide}`, !errorState);
    }
  }

  function formatDate(dateString: string): string {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }

    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate.replace(/\//g, "-");
  }

  function formatTime(timeString: string): string {
    if (timeString === "") {
      return "";
    }

    return timeString + ":00";
  }

  function SearchButtonClick() {
    const startDate = formatDate(startDateRef.current?.value || "");
    const startTime = formatTime(startTimeRef.current?.value || "");
    const endDate = formatDate(endDateRef.current?.value || "");
    const endTime = formatTime(endTimeRef.current?.value || "");

    //VALIDATION (Probably move into validation function)
    if (startDate === "") {
      toggleErrorState();
      setErrorState("There must be a start date specified");
      return;
    }
    if (endDate === "") {
      toggleErrorState();
      setErrorState("There must be an end date specified");
      return;
    }
    if (startTime === "") {
      toggleErrorState();
      setErrorState("There must be a start time specified");
      return;
    }
    if (endTime === "") {
      toggleErrorState();
      setErrorState("There must be an end time specified");
      return;
    }

    //Fetch from API
    setErrorState("");
    FetchData(
      "?fromDate=" +
        startDate +
        "%20" +
        startTime +
        "&toDate=" +
        endDate +
        "%20" +
        endTime
    );
  }

  async function FetchData(query: string): Promise<void> {
    console.log("Query: " + LINK + GetData + query);
    try {
      // # Makes a request to the API to get data depending on the query
      const response: Response = await fetch(LINK + GetData + query, {
        mode: "cors",
      });
      // ! If something went wrong --> Throw an Error.
      if (!response.ok) {
        throw new Error("Could not get information from API...");
      }

      const data: APIData[] = await response.json(); // # Convert from JSON to APIData Object
      const tmpData: APIData[] = [];

      data.forEach((elm: APIData) => {
        const tmpElm: APIData = {
          id: elm.id,
          temp: parseInt(elm.temp + ""),
          humidity: parseInt(elm.humidity + ""),
          co2: (parseInt(elm.co2 + "") / PPMCalc.PPM_MAX) * 100,
          timestamp: elm.timestamp,
        };
        tmpData.push(tmpElm);
      });

      // NOTE: Split the data into the correct displays.
      setGraphData(tmpData);

      // # Set the connection status
    } catch (Error) {
      // # Indicate that we couldn't fetch from API
      console.error(Error);
    }
  }

  return (
    <div className="App">
      <div className={styles.dateErrorWrapper}>
        <div className={styles.dateContainer}>
          <div className={styles.iconInputContainer}>
            <img
              className={styles.icon}
              src={redCalendarIcon}
              alt="calendar icon"
            />
            <input
              className={styles.dateInput}
              type="date"
              ref={startDateRef}
            ></input>
          </div>
          <div className={styles.iconInputContainer}>
            <img className={styles.icon} src={redClockIcon} alt="time icon" />
            <input
              className={styles.dateInput}
              type="time"
              ref={startTimeRef}
            ></input>
          </div>

          <div className={styles.iconInputContainer}>
            <img
              className={styles.icon}
              src={blueCalendarIcon}
              alt="calendar icon"
            />
            <input
              className={styles.dateInput}
              type="date"
              ref={endDateRef}
            ></input>
          </div>
          <div className={styles.iconInputContainer}>
            <img className={styles.icon} src={blueClockIcon} alt="time icon" />
            <input
              className={styles.dateInput}
              type="time"
              ref={endTimeRef}
            ></input>
          </div>

          <button className={styles.dateButton} onClick={SearchButtonClick}>
            SEARCH
          </button>
        </div>

        <div
          className={`${styles.ErrorContainer} ${
            errorState ? "" : styles.hide
          }`}
          id="errorState"
        >
          {errorState}
        </div>
      </div>

      <div className={styles.graphContainer}>
        <div className={styles.tempGraphContainer}>
          <ResponsiveContainer width="100%">
            <LineChart
              data-testid="temp-graph"
              data={GraphData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
              <XAxis dataKey="timestamp" stroke="#000000" />
              <YAxis
                unit="°C"
                type="number"
                stroke="#000000"
                domain={[-20, 100]}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#FF6B6B"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.humidityGraphContainer}>
          <ResponsiveContainer width="100%">
            <LineChart
              data-testid="humidity-graph"
              data={GraphData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
              <XAxis dataKey="timestamp" stroke="#000000" />
              <YAxis
                unit="%"
                type="number"
                stroke="#000000"
                domain={[0, 100]}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#4D96FF"
                strokeWidth={4}
              />
              <Line
                type="monotone"
                dataKey="co2"
                stroke="#AA77FF"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
