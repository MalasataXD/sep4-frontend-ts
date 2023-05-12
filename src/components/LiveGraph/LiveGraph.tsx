import { Type } from "typescript";
import "./LiveGraph.css";
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
  } from "recharts";
import { useState, useEffect } from "react";
  

export default function LiveGraph() {
  const [tempData, setTempData] = useState<tempObj[] | undefined>(undefined);
  const [humidityAndCO2Data, setHumidityAndCO2Data] = useState<humidityAndCO2Obj[] | undefined>(undefined);
  

  const today = new Date();
  const time =
      (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) + ":" + 
      (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + ":" + 
      (today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds());

  interface tempObj {
    time: string,
    temp: number
  }

  interface humidityAndCO2Obj {
    time: string,
    humidity: number,
    co2: number
  }
  
  const temperatureData: tempObj[] = [
    { time: time, temp: 23 },
    { time: time, temp: 33 },
    { time: time, temp: 35 },
    { time: time, temp: 38 },
    { time: time, temp: 40 },
  ];
    
  const humidityData: humidityAndCO2Obj[] = [
    { time: time, humidity: 33, co2: 43 },
    { time: time, humidity: 45, co2: 23 },
    { time: time, humidity: 56, co2: 45 },
    { time: time, humidity: 34, co2: 65 },
    { time: time, humidity: 46, co2: 73 },
  ];

  useEffect(() => {
      //Set temp and humidity/CO2 data values
      setTempData(temperatureData);
      setHumidityAndCO2Data(humidityData);
  }, []);


  return (
    <div className="App">
      <div className="graph-container">
        <div className="temp-graph-container">
          <LineChart data-testid="temp-graph"
            width={730}
            height={250}
            data={tempData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
            <XAxis dataKey="time" stroke="#000000" />
            <YAxis type="number" stroke="#000000" domain={[-20, 100]}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#EF476F" strokeWidth={4}/>
          </LineChart>
        </div>
        <div className="humidity-graph-container">
          <LineChart data-testid="humidity-graph"
            width={730}
            height={250}
            data={humidityAndCO2Data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
            <XAxis dataKey="time" stroke="#000000" />
            <YAxis type="number" stroke="#000000" domain={[0, 100]}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="humidity" stroke="#06D6A0" strokeWidth={4}/>
            <Line type="monotone" dataKey="co2" stroke="#037c5d" strokeWidth={4}/>
          </LineChart>
        </div>
      </div>
    </div>
  );
}