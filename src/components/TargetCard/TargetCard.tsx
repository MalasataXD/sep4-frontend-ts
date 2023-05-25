import "./TargetCard.module.css";
import { useEffect, useState } from "react";
import { target } from "../config";
import styles from "./TargetCard.module.css";

export default function TargetCard(props: any) {
  // ¤ RECEIVED TARGET
  let selected: target = props.SelectedData?.targets.find(
    (element: target, index: number) => index == props.Id
  );

  // # INPUT
  const [temperature, setTemperature] = useState<undefined | number>(
    Number(selected?.temp)
  );
  const [humidity, setHumidity] = useState<undefined | number>(
    Number(selected?.humidity)
  );
  const [time, setTime] = useState<undefined | string>(selected?.offset);
  const [disabled, setDisabled] = useState<boolean>(true);

  // NOTE: Updates the fields from the received target
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

  // NOTE: Disables/enables the fields on Edit Mode.
  useEffect(() => {
    if (props.ShowEdit || props.ShowAdd) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [props.ShowEdit, props.ShowAdd]);

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <b>{props.Title}</b>
      </div>
      <br />
      <div className={styles.inputContainer}>
        <input
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
    </div>
  );
}
