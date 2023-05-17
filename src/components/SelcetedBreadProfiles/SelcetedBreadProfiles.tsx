//import { } from "../config;"
import { useState } from "react";
import "./SelcetedBreadProfiles.css";

export default function SelcetedBreadProfiles() {
  const [dropdownItems, setdropdownItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
  ]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showAdd, setshowAdd] = useState(false);
  const [showRemove, setshowRemove] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
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
          onChange={(event) => setInputValue(event.target.value)}
        />

        {showDropdown && (
          <div id="myDropdown" className="dropdown-content">
            {dropdownItems.map((item, index) => (
              <div
                key={index}
                className="dropdown-item"
                onMouseDown={() => handleItemClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {buttonsRemoveAndEdit()}

      {add()}
      {Remove()}
      {Edit()}
    </div>
  );

  function buttonsRemoveAndEdit() {
    if (validationInput()) {
      return (
        <div>
          <button
            className="dropbtn"
            onClick={() => {
              setshowRemove(false);
              setshowEdit(false);
              setshowAdd(true);
            }}
          >
            Add
          </button>
          <button
            className="dropbtn"
            onClick={() => {
              setshowAdd(false);
              setshowEdit(false);
              setshowRemove(true);
            }}
          >
            Remove
          </button>
          <button
            className="dropbtn"
            onClick={() => {
              setshowAdd(false);
              setshowRemove(false);
              setshowEdit(true);
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
            setshowRemove(false);
            setshowEdit(false);
            setshowAdd(true);
          }}
        >
          Add
        </button>
      );
    }
  }

  function add() {
    if (showAdd) {
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
                setshowAdd(false);
                setTitle("");
                setDescription("");
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                setshowAdd(false);
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
    if (showEdit) {
      //take data and set title and description

      return (
        <div className="Edit">
          <b>Editing Selected Profile</b>
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
                setshowAdd(false);
                setTitle("");
                setDescription("");
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                setshowAdd(false);
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
    if (showRemove) {
      return (
        <div className="Remove">
          <b>Deleting Selected Profile</b>
          <div>
            <button
              onClick={() => {
                setshowAdd(false);
              }}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                setshowRemove(false);
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
    return true;
  }

  function validationTitleAndDescription() {
    return true;
  }

  function GetProfils() {
    //make hry profil from  server
  }

  function UpdateProfil() {
    //make update profil to server
    setTitle("");
    setDescription("");
  }

  function PostNewProfil() {
    //make post new profil to server
    setTitle("");
    setDescription("");
  }

  function DeleteProfil() {
    //make delete re to server
    setInputValue("");
  }

  function handleItemClick(item: string) {
    console.log("Clicked item:", item);
    setInputValue(item);
    toggleDropdownOff();
  }

  function toggleDropdownOn() {
    setShowDropdown(true);
  }
  function toggleDropdownOff() {
    setShowDropdown(false);
  }
}
