import { LINK, EditValuesPost } from "../config";
import { useState } from "react";
import styles from "./EditValues.module.css";

// # ICONS
import sendIcon from "../../img/icons/send.png";
import temperatureIcon from "../../img/icons/temperature.png";
import humidityIcon from "../../img/icons/humidity.png";

export function EditValues() {
  //inputs and errorState
  const [temperature, setTemperature] = useState<null | number>(null);
  const [humidity, setHumidity] = useState<null | number>(null);
  const [errorState, setErrorState] = useState("");
  let hideErrorState: boolean = true;

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <b>Edit Values</b>
      </div>
      <div className={styles.container}>
        <div className={styles.section}>
          <img className={styles.icon} src={temperatureIcon} alt="flame" />
          <input
            className={styles.inputField}
            placeholder="Temperature (°C)"
            type="number"
            onChange={(event) =>
              setTemperature(
                event.target.value === "" ? null : Number(event.target.value)
              )
            }
          />
        </div>
        <div className={styles.section}>
          <img className={styles.icon} src={humidityIcon} alt="water drop" />
          <input
            className={styles.inputField}
            placeholder="Humidity (%)"
            type="number"
            onChange={(event) =>
              setHumidity(
                event.target.value === "" ? null : Number(event.target.value)
              )
            }
          />
        </div>
        <div className={styles.section}>
          <button className={styles.SaveButton} onClick={() => handleClick()}>
            <img className={styles.icon} src={sendIcon} alt="paper airplane" />
            <p>SAVE</p>
          </button>
        </div>
      </div>
      <div
        className={`${styles.ErrorContainer} ${styles.hide}`}
        id="errorState"
      >
        {errorState}
      </div>
    </div>
  );

  // # Toggles the Error message at the bottom of the component.
  function toggleErrorState() {
    const connectionSection = document.getElementById("errorState");
    if (connectionSection) {
      connectionSection.classList.toggle(`${styles.hide}`, hideErrorState);
    }
  }

  function formatTime(dateStr: string): string {
    let dateString: string = dateStr.split(" ")[0];
    let timeString: string = dateStr.split(" ")[1];

    if (timeString.split("")[0] === "0") {
      const stringArr : string[] = timeString.split("")
      stringArr.shift(); //Remove first element ("0")

      var tempString = "";
      stringArr.forEach((element) => {
          tempString += element
      });

      timeString = tempString;
    }

    return dateString + " " + timeString;
  }

  async function handleClick() {
    // Post to web-API
    if (validation()) {
      try {
        const date = new Date();
        var dateStr =
          ("00" + date.getDate()).slice(-2) +
          "-" +
          ("00" + (date.getMonth() + 1)).slice(-2) +
          "-" +
          date.getFullYear() +
          " " +
          ("00" + date.getHours()).slice(-2) +
          ":" +
          ("00" + date.getMinutes()).slice(-2) +
          ":" +
          ("00" + date.getSeconds()).slice(-2);

        var finalDateStr: string = formatTime(dateStr);

        const response = await fetch(LINK + EditValuesPost, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify([
            {
              temp: `${temperature}`,
              humidity: `${humidity}`,
              timeToActivate: `${finalDateStr}`,
            },
          ]),
        });

        if (!response.ok) {
          hideErrorState = false;
          toggleErrorState();
          setErrorState("Post failed!");
        }
      } catch (error) {
        hideErrorState = false;
        toggleErrorState();
        setErrorState("server didn't respond!");
      }
    }
  }
  function validation() {
    if (temperature === null || humidity === null) {
      hideErrorState = false;
      toggleErrorState();
      setErrorState("There must be an input");
      return false;
    }
    if (temperature > 100 || temperature < -20) {
      hideErrorState = false;
      toggleErrorState();
      setErrorState("Temperature must be between -20 and 100");
      return false;
    }
    if (humidity > 100 || humidity < 0) {
      hideErrorState = false;
      toggleErrorState();
      setErrorState("Humidity must be between 0 and 100");
      return false;
    }
    hideErrorState = true;
    toggleErrorState();
    setErrorState("");
    return true;
  }
}

export default EditValues;
