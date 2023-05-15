import "./TargetCard.css";
import { LINK, TargetCardUpdate } from "../config";
import { useState } from "react";

export default function TargetCard(props: any) {
  const [temperature, setTemperature] = useState<null | number>(null);
  const [humidity, setHumidity] = useState<null | number>(null);
  const [time, setTime] = useState<null | string>(null);

  const [errorState, setErrorState] = useState("");

  return (
    <div className="Edit-values-card">
      <div className="Title">
        <b>{props.title}</b>
      </div>
      <br />
      <div className="Input-container">
        <input
          className="Input"
          placeholder="Temperature (°C)"
          type="number"
          onChange={(event) =>
            setTemperature(
              event.target.value === "" ? null : Number(event.target.value)
            )
          }
        />

        <input
          className="Input"
          placeholder="Humidity (%)"
          type="number"
          onChange={(event) =>
            setHumidity(
              event.target.value === "" ? null : Number(event.target.value)
            )
          }
        />

        <input
          className="Input"
          placeholder="hh:mm:ss (%)"
          type="string"
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
    if (props.saveButton === true) {
      return (
        <button className="Save-button" onClick={() => handleClick()}>
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
          setErrorState("Post failed!");
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

    if (Array[0] > "24" || Array[0] < "00") {
      showErrorState();
      setErrorState("Hours must be between 00 and 24");
      return false;
    }

    if (Array[1] > "60" || Array[1] < "00") {
      showErrorState();
      setErrorState("Minutes must be between 00 and 60");
      return false;
    }

    if (Array[2] > "60" || Array[2] < "00") {
      showErrorState();
      setErrorState("Seconds must be between 00 and 60");
      return false;
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
