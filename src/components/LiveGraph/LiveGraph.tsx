import styles from "./LiveGraph.module.css";
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
import { useState, useEffect } from "react";
import { GetData, LINK } from "../config";

export default function LiveGraph() {
  const [FetchData, setData] = useState<APIData[]>([]);

  // # Type for the incoming data from the API
  interface APIData {
    id: number;
    temp: number;
    humidity: number;
    co2: number;
    timestamp: string;
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        console.log("Fetching...");
        const response = await fetch(LINK + GetData, {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Could not get information from API...");
        }
        const data = await response.json();

        const fetchedData: APIData = {
          id: parseInt(data[0].id),
          temp: parseInt(data[0].temp),
          humidity: parseInt(data[0].humidity),
          co2: Number((Number((parseInt(data[0].co2) / 5000) * 100).toFixed(2))), // NOTE: CONVERT FROM PPM TO %
          timestamp: data[0].timestamp.split(" ", 2)[1],
        };

        setData((prevData) => {
          const updatedData = [...prevData, fetchedData];
          if (updatedData.length >= 15) {
            updatedData.shift(); // Remove the first element
          }
          return updatedData;
        });
      } catch (error) {
        console.log(error);
      }
    };

    const timer = setTimeout(fetchData, 0); // Call fetchData immediately on load
    const interval = setInterval(fetchData, 120000); // Call fetchData every 2 minutes

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <div className={styles.graphContainer}>
        <div className={styles.tempGraphContainer}>
          <ResponsiveContainer width="100%">
            <LineChart
              data-testid="temp-graph"
              data={FetchData}
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
              data={FetchData}
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
