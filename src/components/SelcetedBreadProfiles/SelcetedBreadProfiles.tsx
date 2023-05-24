//import { } from "../config;"
import { useState, useEffect } from "react";
import "./SelcetedBreadProfiles.css";

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

export default function SelcetedBreadProfiles(props: any) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  return (
    <div>
      <div onBlur={toggleDropdownOff}>
        <input
          type="text"
          placeholder="Search.."
          id="myInput"
          value={inputValue}
          onFocus={toggleDropdownOn}
          onChange={(event) => {
            setInputValue(event.target.value);
            props.setSelectedDate(null);
          }}
        />

        {dropdown()}
      </div>

      {buttonsRemoveAndEdit()}

      {add()}
      {Remove()}
      {Edit()}

      <div className="error-container hide" id="errorState">
        {props.errorState}
      </div>
    </div>
  );

  function dropdown() {
    if (showDropdown) {
      if (props.Data != null) {
        return (
          <div id="myDropdown" className="dropdown-content">
            {props.Data.map((item: BreadProfile, index: number) => (
              <div
                key={index}
                className="dropdown-item"
                onMouseDown={() => handleItemClick(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div id="myDropdown" className="dropdown-content">
            <div className="dropdown-item">
              No Bread Profiles or server down
            </div>
          </div>
        );
      }
    }
  }

  function buttonsRemoveAndEdit() {
    if (validationInput()) {
      return (
        <div>
          <button
            className="dropbtn"
            onClick={() => {
              props.setSelectedDate({ targets: [{}, {}, {}, {}] });
              props.setshowRemove(false);
              props.setshowEdit(false);
              props.setshowAdd(true);
              setInputValue("");
              setDescription("");
              setTitle("");
            }}
          >
            Add
          </button>
          <button
            className="dropbtn"
            onClick={() => {
              props.setshowAdd(false);
              props.setshowEdit(false);
              props.setshowRemove(true);
            }}
          >
            Remove
          </button>
          <button
            className="dropbtn"
            onClick={() => {
              props.setshowAdd(false);
              props.setshowRemove(false);
              props.setshowEdit(true);
              setDescription(props.SelectedData.description);
              setTitle(props.SelectedData.title);
            }}
          >
            Edit
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="dropbtn"
          onClick={() => {
            props.setSelectedDate({ targets: [{}, {}, {}, {}] });
            props.setshowRemove(false);
            props.setshowEdit(false);
            props.setshowAdd(true);
            setInputValue("");
            setDescription("");
            setTitle("");
          }}
        >
          Add
        </button>
      );
    }
  }

  function add() {
    if (props.ShowAdd) {
      return (
        <div className="Add">
          <b>Create a new Profile</b>
          <input
            type="text"
            placeholder="Title"
            value={Title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <textarea
            placeholder="Description"
            value={Description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <div>
            <button
              onClick={() => {
                props.setshowAdd(false);
                setTitle("");
                setDescription("");
                hideErrorState();
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                PostNewProfil();
              }}
            >
              Create
            </button>
          </div>
        </div>
      );
    }
    return <></>;
  }

  function Edit() {
    if (props.ShowEdit) {
      //take data and set title and description
      return (
        <div className="Edit">
          <b>Editing Selected Profile</b>
          <input
            type="text"
            placeholder="Title"
            value={Title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>

          <textarea
            placeholder="Description"
            value={Description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <div>
            <button
              onClick={() => {
                props.setshowEdit(false);
                setTitle("");
                setDescription("");
                hideErrorState();
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                UpdateProfil();
              }}
            >
              Save
            </button>
          </div>
        </div>
      );
    }
    return <></>;
  }

  function Remove() {
    if (props.ShowRemove) {
      return (
        <div className="Remove">
          <b>Deleting Selected Profile</b>
          <div>
            <button
              onClick={() => {
                props.setshowRemove(false);
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                props.setshowRemove(false);
                DeleteProfil();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      );
    }
    return <></>;
  }

  function validationInput() {
    return (
      props.SelectedData !== null && props.SelectedData?.title !== undefined
    );
  }

  //------------------------------------------------------------------------------
  function UpdateProfil() {
    const breadProfil: BreadProfile = {
      ...props.SelectedData,
      title: Title,
      description: Description,
    };

    if (validationAll(breadProfil)) {
      props.setshowAdd(false);
      props.setshowEdit(false);
      props.UpdateProfil(breadProfil);

      setTitle("");
      setDescription("");
      setInputValue("");

      props.setSelectedDate(null);
    }
  }

  function PostNewProfil() {
    const breadProfil: BreadProfile = {
      ...props.SelectedData,
      title: Title,
      description: Description,
    };

    if (validationAll(breadProfil)) {
      props.setshowAdd(false);
      props.setSelectedDate({ breadProfil });

      props.PostProfil(breadProfil);

      setTitle("");
      setDescription("");

      props.setSelectedDate(null);
    }
  }

  function DeleteProfil() {
    const breadProfil: BreadProfile = {
      ...props.SelectedData,
    };
    props.DeleteProfil(breadProfil);

    setTitle("");
    setDescription("");
    setInputValue("");

    props.setSelectedDate(null);
  }

  //------------------------------------------------------------------------------
  function handleItemClick(item: BreadProfile) {
    props.setshowRemove(false);
    props.setshowEdit(false);
    props.setshowAdd(false);

    let copieditem: BreadProfile = { ...item, targets: item.targets };

    if (copieditem.targets === undefined) {
      copieditem = { ...copieditem, targets: [] };
    }

    for (let i = 0; i < 4; i++) {
      if (
        copieditem?.targets?.find(
          (element: target, index: number) => i === index
        ) === null
      ) {
        copieditem = { ...copieditem, targets: [...copieditem.targets, {}] };
      }
    }

    props.setSelectedDate({ ...copieditem });

    setInputValue(item?.title);

    setDescription("" + copieditem.description);
    setTitle("" + copieditem.title);

    toggleDropdownOff();
  }

  function toggleDropdownOn() {
    setShowDropdown(true);
  }
  function toggleDropdownOff() {
    setShowDropdown(false);
  }

  function validationAll(profile: BreadProfile) {
    if (profile.title === "" || profile.description === "") {
      showErrorState();
      props.setErrorState("There must be an title and description");
      return false;
    }

    let hasFailed: boolean = false;

    profile.targets?.forEach((element) => {
      if (!validation(element.temp, element.humidity, element.offset)) {
        hasFailed = true;
        return;
      }
    });

    if (!hasFailed) {
      hideErrorState();
      props.setErrorState("");
    }
    return !hasFailed;
  }

  function validation(
    temperature: string | undefined,
    humidity: string | undefined,
    time: string | undefined
  ) {
    if (!validationTemp(temperature)) {
      return false;
    }
    if (!validationHumidity(humidity)) {
      return false;
    }
    if (!validationTime(time)) {
      return false;
    }
    return true;
  }

  function validationTemp(temperature: string | undefined) {
    if (temperature === undefined || temperature === "") {
      showErrorState();
      props.setErrorState("There must be an input in temperature");
      return false;
    }
    if (Number(temperature) > 100 || Number(temperature) < -20) {
      showErrorState();
      props.setErrorState("Temperature must be between -20 and 100");
      return false;
    }
    return true;
  }

  function validationHumidity(humidity: string | undefined) {
    if (humidity === undefined || humidity === "") {
      showErrorState();
      props.setErrorState("There must be an input in Humidity");
      return false;
    }
    if (Number(humidity) > 100 || Number(humidity) < 0) {
      showErrorState();
      props.setErrorState("Humidity must be between 0 and 100");
      return false;
    }
    return true;
  }

  function validationTime(time: string | undefined) {
    if (time === undefined || time === "") {
      showErrorState();
      props.setErrorState("There must be an input in Time");
      return false;
    }
    if (time > "24:00:00" || time < "00:00:00") {
      showErrorState();
      props.setErrorState("Time must be between 00:00:00 and 24:00:00");
      return false;
    }

    //Test for time
    const Array = time.split(":");

    if (Array.length != 3) {
      showErrorState();
      props.setErrorState("Time is not the right format");
      return false;
    }

    if (parseInt(Array[0]) > 24 || parseInt(Array[0]) < 0) {
      showErrorState();
      props.setErrorState("Hours must be between 00 and 24");
      return false;
    }

    if (parseInt(Array[1]) > 60 || parseInt(Array[1]) < 0) {
      showErrorState();
      props.setErrorState("Minutes must be between 00 and 60");
      return false;
    }

    if (parseInt(Array[2]) > 60 || parseInt(Array[2]) < 0) {
      showErrorState();
      props.setErrorState("Seconds must be between 00 and 60");
      return false;
    }

    for (let i = 0; i < Array.length; i++) {
      if (isNaN(parseInt(Array[i]))) {
        showErrorState();
        props.setErrorState("Not a number");
        return false;
      }
    }

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
