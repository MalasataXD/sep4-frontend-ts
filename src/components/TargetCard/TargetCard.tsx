import "./TargetCard.css";
import { LINK, TargetCardUpdate } from "../config";
import { useState } from "react";
import { Turn } from "hamburger-react";
import { forEachChild } from "typescript";

export default function TargetCard(props: any) {
  const [temperature, setTemperature] = useState<null | number>(null);
  const [humidity, setHumidity] = useState<null | number>(null);
  const [time, setTime] = useState<null | string>(null);

  const [errorState, setErrorState] = useState("");

  return (
    <div className="Target-card-card">
      <div className="Title-TargetCard">
        <b>{props.Title}</b>
      </div>
      <br />
      <div className="Input-container-TargetCard">
        <input
          className="Input-TargetCard"
          placeholder="Temperature (°C)"
          type="number"
          onChange={(event) =>
            setTemperature(
              event.target.value === "" ? null : Number(event.target.value)
            )
          }
        />

        <input
          className="Input-TargetCard"
          placeholder="Humidity (%)"
          type="number"
          onChange={(event) =>
            setHumidity(
              event.target.value === "" ? null : Number(event.target.value)
            )
          }
        />

        <input
          className="Input-TargetCard"
          placeholder="Time (hh:mm:ss)"
          type="text"
          onChange={(event) =>
            setTime(event.target.value === "" ? null : event.target.value)
          }
        />

        {isWhereASaveButton()}
      </div>
      <div className="error-container hide" id="errorState">
        {errorState}
      </div>
    </div>
  );

  function isWhereASaveButton() {
    if (props.isEditModeOn === true) {
      return (
        <button
          className="Save-button-TargetCard"
          onClick={() => handleClick()}
        >
          SAVE
        </button>
      );
    }
    return;
  }

  async function handleClick() {
    // Post to web-API
    if (validation()) {
      try {
        //need to changes --------------------------------------------------
        const response = await fetch(LINK + TargetCardUpdate, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            temp: `${temperature}`,
            humidity: `${humidity}`,
          }),
        });
        // -------------------------------------------------------------------
        if (!response.ok) {
          showErrorState();
          setErrorState("Update failed!");
        }
      } catch (error) {
        showErrorState();
        setErrorState("server didn't respond!");
      }
    }
  }

  function validation() {
    //Test for temperature and humidity
    if (temperature === null || humidity === null || time === null) {
      showErrorState();
      setErrorState("There must be an input");
      return false;
    }
    if (temperature > 100 || temperature < -20) {
      showErrorState();
      setErrorState("Temperature must be between -20 and 100");
      return false;
    }
    if (humidity > 100 || humidity < 0) {
      showErrorState();
      setErrorState("Humidity must be between 0 and 100");
      return false;
    }
    if (time > "24:00:00" || time < "00:00:00") {
      showErrorState();
      setErrorState("Time must be between 00:00:00 and 24:00:00");
      return false;
    }

    //Test for time
    const Array = time.split(":");

    if (Array.length != 3) {
      showErrorState();
      setErrorState("Time is not the right format");
      return false;
    }

    if (parseInt(Array[0]) > 24 || parseInt(Array[0]) < 0) {
      showErrorState();
      setErrorState("Hours must be between 00 and 24");
      return false;
    }

    if (parseInt(Array[1]) > 60 || parseInt(Array[1]) < 0) {
      showErrorState();
      setErrorState("Minutes must be between 00 and 60");
      return false;
    }

    if (parseInt(Array[2]) > 60 || parseInt(Array[2]) < 0) {
      showErrorState();
      setErrorState("Seconds must be between 00 and 60");
      return false;
    }

    for (let i = 0; i < Array.length; i++) {
      for (let j = 0; i < Array[i].length; j++) {
        console.log(isNaN(parseInt(Array[i][j])));
        if (isNaN(parseInt(Array[i][j]))) {
          showErrorState();
          setErrorState("Not a number");
          return false;
        }
      }
    }

    hideErrorState();
    setErrorState("");
    return true;
  }

  function hideErrorState() {
    var element = document.getElementById("errorState");
    element?.classList.add("hide");
  }

  function showErrorState() {
    var element = document.getElementById("errorState");
    element?.classList.remove("hide");
  }
}
