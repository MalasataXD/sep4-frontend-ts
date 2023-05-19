import styles from "./HistoryGraph.module.css"
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

export default function HistoryGraph() {
    const [GraphData, setGraphData] = useState<APIData[]>([]);

    interface APIData {
        id: number;
        temp: string;
        humidity: string;
        co2: string;
        timestamp: string;
    }

    enum Operations {
        HOUR,
        DAY,
        MONTH,
        YEAR
    }

    enum Colors {
        RED = "#FF6B6B",
        GREEN = "#06D6A0",
        WHITE = "#FFFFFF"
    }

    function tempButtonClick(operation: Operations, id: string) {
        // Reset styles for all buttons
        document.getElementById("tempHourButton")!.style.backgroundColor = Colors.WHITE;
        document.getElementById("tempHourButton")!.style.color = Colors.RED;
    
        document.getElementById("tempDayButton")!.style.backgroundColor = Colors.WHITE;
        document.getElementById("tempDayButton")!.style.color = Colors.RED;
    
        document.getElementById("tempMonthButton")!.style.backgroundColor = Colors.WHITE;
        document.getElementById("tempMonthButton")!.style.color = Colors.RED;
    
        document.getElementById("tempYearButton")!.style.backgroundColor = Colors.WHITE;
        document.getElementById("tempYearButton")!.style.color = Colors.RED;
    
        // Set styles for the clicked button
        document.getElementById(id)!.style.backgroundColor = Colors.RED;
        document.getElementById(id)!.style.color = Colors.WHITE;

        //API call and operation HERE:
        switch(operation)  {
            case Operations.HOUR:
                console.log(getHourFromNow());
                console.log("Now: " + getNow());
                break;
            case Operations.DAY:
                console.log(getDayFromNow());
                console.log("Now: " + getNow());
                break;
            case Operations.MONTH:
                console.log(getMonthFromNow());
                console.log("Now: " + getNow());
                break;
            case Operations.YEAR:
                console.log(getYearFromNow());
                console.log("Now: " + getNow());
                break;
        }
    }

    function humidityButtonClick(operation: Operations, id: string) {
        // Reset styles for all buttons
        document.getElementById("humidityHourButton")!.style.backgroundColor = Colors.WHITE;
        document.getElementById("humidityHourButton")!.style.color = Colors.GREEN;
    
        document.getElementById("humidityDayButton")!.style.backgroundColor = Colors.WHITE;
        document.getElementById("humidityDayButton")!.style.color = Colors.GREEN;
    
        document.getElementById("humidityMonthButton")!.style.backgroundColor = Colors.WHITE;
        document.getElementById("humidityMonthButton")!.style.color = Colors.GREEN;
    
        document.getElementById("humidityYearButton")!.style.backgroundColor = Colors.WHITE;
        document.getElementById("humidityYearButton")!.style.color = Colors.GREEN;
    
        // Set styles for the clicked button
        document.getElementById(id)!.style.backgroundColor = Colors.GREEN;
        document.getElementById(id)!.style.color = Colors.WHITE;

        //API call and operation HERE:
        switch(operation)  {
            case Operations.HOUR:
                console.log(getHourFromNow());
                console.log("Now: " + getNow());
                break;
            case Operations.DAY:
                console.log(getDayFromNow());
                console.log("Now: " + getNow());
                break;
            case Operations.MONTH:
                console.log(getMonthFromNow());
                console.log("Now: " + getNow());
                break;
            case Operations.YEAR:
                console.log(getYearFromNow());
                console.log("Now: " + getNow());
                break;
        }
    }

    function formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    }
    
    function formatTime(date: Date): string {
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hour}:${minute}:${seconds}`;
    }

    function getHourFromNow(): string {
        const currentDatetime = new Date();
        const targetDatetime = new Date(currentDatetime.getTime() - 1 * 60 * 60 * 1000);
        const formattedDate = formatDate(targetDatetime);
        const formattedTime = formatTime(targetDatetime);
        return `Date: ${formattedDate}\nTime: ${formattedTime}`;
    }
    
    function getDayFromNow(): string {
        const currentDatetime = new Date();
        const targetDatetime = new Date(currentDatetime.getTime() - 1 * 24 * 60 * 60 * 1000);
        const formattedDate = formatDate(targetDatetime);
        const formattedTime = formatTime(targetDatetime);
        return `Date: ${formattedDate}\nTime: ${formattedTime}`;
    }
    
    function getMonthFromNow(): string {
        const currentDatetime = new Date();
        const targetDatetime = new Date(currentDatetime.getFullYear(), currentDatetime.getMonth() - 1, currentDatetime.getDate(), currentDatetime.getHours(), currentDatetime.getMinutes(), currentDatetime.getSeconds(), currentDatetime.getMilliseconds());
        const formattedDate = formatDate(targetDatetime);
        const formattedTime = formatTime(targetDatetime);
        return `Date: ${formattedDate}\nTime: ${formattedTime}`;
    }
    
    function getYearFromNow(): string {
        const currentDatetime = new Date();
        const targetDatetime = new Date(currentDatetime.getFullYear() - 1, currentDatetime.getMonth(), currentDatetime.getDate(), currentDatetime.getHours(), currentDatetime.getMinutes(), currentDatetime.getSeconds(), currentDatetime.getMilliseconds());
        const formattedDate = formatDate(targetDatetime);
        const formattedTime = formatTime(targetDatetime);
        return `Date: ${formattedDate}\nTime: ${formattedTime}`;
    }

    function getNow(): string {
        const currentDatetime = new Date();
        const formattedDate = formatDate(currentDatetime);
        const formattedTime = formatTime(currentDatetime);
        return `Date: ${formattedDate}\nTime: ${formattedTime}`;
    }
    

    return (
        <div className="App">
            <div className={styles.graphContainer}>
                <div className={styles.tempGraphContainer}>
                    <ResponsiveContainer width="100%">
                        <LineChart
                            data-testid="temp-graph"
                            data={GraphData}
                            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                        >
                        <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
                        <XAxis dataKey="time" stroke="#000000" />
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

                    <div className={styles.buttonContainer}>
                        <button name="tempHourButton" id="tempHourButton" className={styles.tempButton} onClick={() => tempButtonClick(Operations.HOUR, "tempHourButton")} >HOUR</button>
                        <button name="tempDayButton" id="tempDayButton" className={styles.tempButton} onClick={() => tempButtonClick(Operations.DAY, "tempDayButton")} >DAY</button>
                        <button name="tempMonthButton" id="tempMonthButton" className={styles.tempButton} onClick={() => tempButtonClick(Operations.MONTH, "tempMonthButton")} >MONTH</button>
                        <button name="tempYearButton" id="tempYearButton" className={styles.tempButton} onClick={() => tempButtonClick(Operations.YEAR, "tempYearButton")} >YEAR</button>
                    </div>
                </div>
                <div className={styles.humidityGraphContainer}>
                    <ResponsiveContainer width="100%">
                        <LineChart
                            data-testid="humidity-graph"
                            data={GraphData}
                            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#111111" />
                            <XAxis dataKey="time" stroke="#000000" />
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

                    <div className={styles.buttonContainer}>
                        <button name="humidityHourButton" id="humidityHourButton" className={styles.humidityButton} onClick={() => humidityButtonClick(Operations.HOUR, "humidityHourButton")} >HOUR</button>
                        <button name="humidityDayButton" id="humidityDayButton" className={styles.humidityButton} onClick={() => humidityButtonClick(Operations.DAY, "humidityDayButton")} >DAY</button>
                        <button name="humidityMonthButton" id="humidityMonthButton" className={styles.humidityButton} onClick={() => humidityButtonClick(Operations.MONTH, "humidityMonthButton")} >MONTH</button>
                        <button name="humidityYearButton" id="humidityYearButton" className={styles.humidityButton} onClick={() => humidityButtonClick(Operations.YEAR, "humidityYearButton")} >YEAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
}