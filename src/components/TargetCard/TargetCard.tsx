import "./TargetCard.css";
import { LINK, TargetCardUpdate } from "../config";
import { useEffect, useState } from "react";
import { Turn } from "hamburger-react";
import { forEachChild } from "typescript";
import { map } from "d3-array";
import { element } from "prop-types";

export default function TargetCard(props: any) {
  let selected: target = props.SelectedData?.targets.find(
    (element: target, index: number) => index == props.Id
  );
  //input
  const [temperature, setTemperature] = useState<undefined | number>(
    Number(selected?.temp)
  );
  const [humidity, setHumidity] = useState<undefined | number>(
    Number(selected?.humidity)
  );
  const [time, setTime] = useState<undefined | string>(selected?.offset);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errorState, setErrorState] = useState("");

  interface BreadProfile {
    id?: number;
    title?: string;
    description?: string;
    targets?: target[];
  }

  interface target {
    id?: number;
    temp?: string;
    humidity?: string;
    co2?: string;
    offset?: string;
  }

  useEffect(() => {
    const target: target = props.SelectedData?.targets?.find(
      (item: target, index: number) => index === props.Id
    );
    if (target?.temp === null) {
      setTemperature(undefined);
    } else {
      setTemperature(Number(target?.temp));
    }

    if (target?.humidity === null) {
      setHumidity(undefined);
    } else {
      setHumidity(Number(target?.humidity));
    }

    if (target?.offset === null || target?.offset === undefined) {
      setTime("");
    } else {
      setTime(target?.offset);
    }
  }, [props.SelectedData?.title]);

  useEffect(() => {
    if (props.ShowEdit) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [props.ShowEdit]);

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
          disabled={disabled}
          id="Temperature"
          value={temperature}
          onChange={(event) => {
            setTemperature(
              event.target.value === "" ? undefined : Number(event.target.value)
            );

            let t: target[] = [];

            props.SelectedData.targets.map((item: target, index: number) => {
              if (index !== props.Id) {
                t = [...t, item];
              } else {
                t = [...t, { ...selected, temp: event.target.value }];
              }
            });

            props.setSelectedDate({
              ...props.SelectedData,
              targets: [...t],
            });
          }}
        />

        <input
          className="Input-TargetCard"
          placeholder="Humidity (%)"
          type="number"
          id="Humidity"
          disabled={disabled}
          value={humidity}
          onChange={(event) => {
            setHumidity(
              event.target.value === "" ? undefined : Number(event.target.value)
            );

            let t: target[] = [];

            props.SelectedData.targets.map((item: target, index: number) => {
              if (index !== props.Id) {
                t = [...t, item];
              } else {
                t = [...t, { ...selected, humidity: event.target.value }];
              }
            });

            props.setSelectedDate({
              ...props.SelectedData,
              targets: [...t],
            });
          }}
        />

        <input
          className="Input-TargetCard"
          placeholder="Time (hh:mm:ss)"
          type="text"
          id="Time"
          disabled={disabled}
          value={time}
          onChange={(event) => {
            setTime(event.target.value === "" ? undefined : event.target.value);

            let t: target[] = [];

            props.SelectedData.targets.map((item: target, index: number) => {
              if (index !== props.Id) {
                t = [...t, item];
              } else {
                t = [...t, { ...selected, offset: event.target.value }];
              }
            });

            props.setSelectedDate({
              ...props.SelectedData,
              targets: [...t],
            });
          }}
        />
      </div>
      <div className="error-container hide" id="errorState">
        {errorState}
      </div>
    </div>
  );

  function validation() {
    //Test for temperature and humidity
    if (
      temperature === undefined ||
      humidity === undefined ||
      time === undefined
    ) {
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
