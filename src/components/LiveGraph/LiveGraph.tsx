import { Type } from "typescript";
import "./LiveGraph.module.css";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { GetData, LINK } from "../config";

export default function LiveGraph() {
  const [FetchData, setData] = useState<APIData[]>([])

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
            co2: parseInt(data[0].co2),
            timestamp: data[0].timestamp
          };
  
          setData(prevData => {
            const updatedData = [...prevData, fetchedData];
            if (updatedData.length > 15) {
              updatedData.shift(); // Remove the oldest element
            }
            return updatedData;
          });
        } catch (error) {
          console.log(error);
        }
      };
  
      const timer = setTimeout(fetchData, 120000);
      return () => clearTimeout(timer);
    }, [FetchData]);

  return (
    <div className="App">
      <div className="graph-container">
        <div className="temp-graph-container">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data-testid="temp-graph" data={FetchData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
              <XAxis dataKey="timestamp" stroke="#000000" />
              <YAxis unit="°C" type="number" stroke="#000000" domain={[-20, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp" stroke="#EF476F" strokeWidth={4} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="humidity-graph-container">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data-testid="humidity-graph"
              data={FetchData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
              <XAxis dataKey="timestamp" stroke="#000000" />
              <YAxis unit="%" type="number" stroke="#000000" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#06D6A0" strokeWidth={4} />
              <Line type="monotone" dataKey="co2" stroke="#037c5d" strokeWidth={4} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
