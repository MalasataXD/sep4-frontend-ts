import TargetCard from "../../components/TargetCard/TargetCard";
import SelectedBreadProfile from "../../components/SelectedBreadProfile/SelectedBreadProfile";
import { useState, useEffect } from "react";
import { LINK, BreadProfiles, BreadProfile } from "../../components/config";
import styles from "./BreadProfilesPage.module.css";

export default function BreadProfilesPage() {
  const [data, setData] = useState<BreadProfile[] | null>([
    { id: 97, title: "Franskbrød", description: "Very nice" },
    { id: 98, title: "Rundstykker", description: "Very nice too." },
  ]);
  const [Selected, setSelected] = useState<BreadProfile | null>(null);

  const [showAdd, setshowAdd] = useState<boolean>(false);
  const [showRemove, setshowRemove] = useState<boolean>(false);
  const [showEdit, setshowEdit] = useState<boolean>(false);

  const [errorState, setErrorState] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <SelectedBreadProfile
        setSelectedDate={(profile: BreadProfile) => setSelectedDate(profile)}
        setshowAdd={(newValue: boolean) => setshowAdd(newValue)}
        setshowRemove={(newValue: boolean) => setshowRemove(newValue)}
        setshowEdit={(newValue: boolean) => setshowEdit(newValue)}
        SelectedData={Selected}
        Data={data}
        PostProfil={(profile: BreadProfile) => PostProfile(profile)}
        DeleteProfil={(profile: BreadProfile) => DeleteProfile(profile)}
        UpdateProfil={(profile: BreadProfile) => UpdateProfile(profile)}
        ShowAdd={showAdd}
        ShowRemove={showRemove}
        ShowEdit={showEdit}
        errorState={errorState}
        setErrorState={(text: string) => setErrorState(text)}
      />
      <div className={styles.cardContainer}>
        <TargetCard
          Title="Chilling"
          SelectedData={Selected}
          Id={0}
          setSelectedDate={(profile: BreadProfile) => setSelectedDate(profile)}
          ShowAdd={showAdd}
          ShowRemove={showRemove}
          ShowEdit={showEdit}
        />
        <TargetCard
          Title="Storage"
          SelectedData={Selected}
          Id={1}
          setSelectedDate={(profile: BreadProfile) => setSelectedDate(profile)}
          ShowAdd={showAdd}
          ShowRemove={showRemove}
          ShowEdit={showEdit}
        />
        <TargetCard
          Title="Awakening"
          SelectedData={Selected}
          Id={2}
          setSelectedDate={(profile: BreadProfile) => setSelectedDate(profile)}
          ShowAdd={showAdd}
          ShowRemove={showRemove}
          ShowEdit={showEdit}
        />
        <TargetCard
          Title="Leavening"
          SelectedData={Selected}
          Id={3}
          setSelectedDate={(profile: BreadProfile) => setSelectedDate(profile)}
          ShowAdd={showAdd}
          ShowRemove={showRemove}
          ShowEdit={showEdit}
        />
      </div>
    </div>
  );

  // # FETCH LIST OF BREAD PROFILES
  async function fetchData(): Promise<void> {
    try {
      // # Makes a request to the API to get all Bread Profiles in the system.
      const response: Response = await fetch(LINK + BreadProfiles, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        mode: "cors",
      });
      // ! If something went wrong --> Throw an Error.
      if (!response.ok) {
        showErrorState();
        setErrorState("Could not get information from API...");
      }

      const data: BreadProfile[] = await response.json(); // # Convert from JSON to APIData Object
      // NOTE: Places the converted data into UseState
      setData(data);
    } catch (Error) {
      showErrorState();
      setErrorState("server didn't respond!");
    }
  }

  // # SET SELECTED BREAD PROFILE FROM DROPDOWN
  function setSelectedDate(profile: BreadProfile) {
    setSelected(profile);
  }

  // * POST NEW BREAD PROFILE TO API
  async function PostProfile(profile: BreadProfile) {
    try {
      const response = await fetch(LINK + BreadProfiles, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        showErrorState();
        setErrorState("not ok");
      }
    } catch (error) {
      showErrorState();
      setErrorState("server didn't respond!");
    }
    await fetchData();
  }

  // * DELETE EXISTING BREAD PROFILE FROM API
  async function DeleteProfile(profile: BreadProfile) {
    try {
      const response = await fetch(
        LINK + BreadProfiles + "?id=" + profile?.id,
        {
          headers: { "Content-Type": "application/json" },
          method: "DELETE",
        }
      );

      if (!response.ok) {
        showErrorState();
        setErrorState("not ok");
      }
    } catch (error) {
      showErrorState();
      setErrorState("server didn't respond!");
    }
    await fetchData();
  }

  // * UPDATE/PATCH EXISTING BREAD PROFILE ON API
  async function UpdateProfile(profile: BreadProfile) {
    try {
      const response = await fetch(LINK + BreadProfiles, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        showErrorState();
        setErrorState("not ok");
      }
    } catch (error) {
      showErrorState();
      setErrorState("server didn't respond!");
    }

    await fetchData();
  }

  // ! SHOW ERRORSTATE
  function showErrorState() {
    var element = document.getElementById("errorState");
    element?.classList.remove("hide");
  }
}
