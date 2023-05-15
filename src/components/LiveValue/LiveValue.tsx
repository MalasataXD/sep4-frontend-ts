import React, {useEffect, useState} from "react";
import "./LiveValue.css";
import {GetData, LINK} from "../config";

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

    // NOTE: Updates the values, when there are new values!
    useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 1000); // NOTE: Waits 2 minutes between each fetch.
    }, []);

    // NOTE: Fetches data immediately, when the component is loaded.
    fetchData();

    function switchConnection(): void {
        // NOTE: Fetch the connection status
        const connectionSection = document.querySelector('.connection');
        if (connectionSection) {
            connectionSection.classList.toggle('connection-up', HasConnection);
            connectionSection.classList.toggle('connection-down', !HasConnection);
        }
    }

    async function fetchData(): Promise<void> {

        try {
            // # Makes a request to the API to get the latest data


            const response: Response = await fetch(LINK + GetData, {
                mode: "cors"
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
            switchConnection()
        }
    }

    // ¤ JSX
    return (
        <div className="container">
            <h3 id="header">LIVE</h3>
            <div className="section zoom temperature">
                <div className="title">
                    <b>Temperature</b>
                </div>
                <div>{Temperature} °C</div>
            </div>

            <div className="section zoom humidity">
                <div className="title">
                    <b>Humidity</b>
                </div>
                <div>{Humidity} %</div>
            </div>

            <div className="section zoom carbon">
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
            <div className="section connection">
                <div className="title">
                    <b>STATUS</b>
                </div>
            </div>
        </div>
    );
}
