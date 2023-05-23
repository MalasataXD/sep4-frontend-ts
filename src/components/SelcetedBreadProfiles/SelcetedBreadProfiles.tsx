//import { } from "../config;"
import { useState, useEffect } from "react";
import "./SelcetedBreadProfiles.css";
import BreadProfilesPage from "../../routes/BreadProfilesPage/BreadProfilesPage";
import { async } from "q";
import { title } from "process";
import { element } from "prop-types";

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
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                props.setshowAdd(false);
                if (validationTitleAndDescription()) {
                  PostNewProfil();
                }
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
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                props.setshowAdd(false);
                props.setshowEdit(false);
                if (validationTitleAndDescription()) {
                  UpdateProfil();
                }
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

  function validationTitleAndDescription() {
    return true;
  }
  //------------------------------------------------------------------------------
  function UpdateProfil() {
    const breadProfil: BreadProfile = {
      ...props.SelectedData,
      title: Title,
      description: Description,
    };

    props.UpdateProfil(breadProfil);

    setTitle("");
    setDescription("");
    setInputValue("");

    props.setSelectedDate(null);
  }

  function PostNewProfil() {
    const breadProfil: BreadProfile = {
      ...props.SelectedData,
      title: Title,
      description: Description,
    };

    props.setSelectedDate({ breadProfil });

    props.PostProfil(breadProfil);

    setTitle("");
    setDescription("");

    props.setSelectedDate(null);
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
}
