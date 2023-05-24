import styles from "./BreadProfilesPage.module.css";
import TargetCard from "../../components/TargetCard/TargetCard";
import SelcetedBreadProfiles from "../../components/SelcetedBreadProfiles/SelcetedBreadProfiles";
import { useState, useEffect } from "react";
import { LINK, BreadProfiles } from "../../components/config";

export default function BreadProfilesPage() {
  const [data, setData] = useState<BreadProfile[] | null>(null);
  const [Selected, setSelected] = useState<BreadProfile | null>(null);

  const [showAdd, setshowAdd] = useState<boolean>(false);
  const [showRemove, setshowRemove] = useState<boolean>(false);
  const [showEdit, setshowEdit] = useState<boolean>(false);

  const [errorState, setErrorState] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(): Promise<void> {
    try {
      // # Makes a request to the API to get the latest data
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
      // NOTE: Split the data into the correct displays.
      setData(data);
    } catch (Error) {
      showErrorState();
      setErrorState("server didn't respond!");
    }
  }

  //lave interface, set <type>
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

  return (
    <div>
      <SelcetedBreadProfiles
        setSelectedDate={(profil: BreadProfile) => setSelectedDate(profil)}
        setshowAdd={(newValue: boolean) => setshowAdd(newValue)}
        setshowRemove={(newValue: boolean) => setshowRemove(newValue)}
        setshowEdit={(newValue: boolean) => setshowEdit(newValue)}
        SelectedData={Selected}
        Data={data}
        PostProfil={(profil: BreadProfile) => PostProfil(profil)}
        DeleteProfil={(profil: BreadProfile) => DeleteProfil(profil)}
        UpdateProfil={(profil: BreadProfile) => UpdateProfil(profil)}
        ShowAdd={showAdd}
        ShowRemove={showRemove}
        ShowEdit={showEdit}
        errorState={errorState}
        setErrorState={(text: string) => setErrorState(text)}
      />
      <TargetCard
        Title="Chilling"
        SelectedData={Selected}
        Id={0}
        setSelectedDate={(profil: BreadProfile) => setSelectedDate(profil)}
        ShowAdd={showAdd}
        ShowRemove={showRemove}
        ShowEdit={showEdit}
      />
      <TargetCard
        Title="Storage"
        SelectedData={Selected}
        Id={1}
        setSelectedDate={(profil: BreadProfile) => setSelectedDate(profil)}
        ShowAdd={showAdd}
        ShowRemove={showRemove}
        ShowEdit={showEdit}
      />
      <TargetCard
        Title="Awakening"
        SelectedData={Selected}
        Id={2}
        setSelectedDate={(profil: BreadProfile) => setSelectedDate(profil)}
        ShowAdd={showAdd}
        ShowRemove={showRemove}
        ShowEdit={showEdit}
      />
      <TargetCard
        Title="Leavening"
        SelectedData={Selected}
        Id={3}
        setSelectedDate={(profil: BreadProfile) => setSelectedDate(profil)}
        ShowAdd={showAdd}
        ShowRemove={showRemove}
        ShowEdit={showEdit}
      />
    </div>
  );

  function setSelectedDate(profil: BreadProfile) {
    setSelected(profil);
  }

  async function PostProfil(profil: BreadProfile) {
    try {
      const response = await fetch(LINK + BreadProfiles, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(profil),
      });

      if (!response.ok) {
        showErrorState();
        setErrorState("not ok");
      }
    } catch (error) {
      showErrorState();
      setErrorState("server didn't respond!");
    }
    fetchData();
  }

  async function DeleteProfil(profil: BreadProfile) {
    try {
      const response = await fetch(LINK + BreadProfiles + "?id=" + profil?.id, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      });

      if (!response.ok) {
        showErrorState();
        setErrorState("not ok");
      }
    } catch (error) {
      showErrorState();
      setErrorState("server didn't respond!");
    }
    fetchData();
  }

  async function UpdateProfil(profil: BreadProfile) {
    try {
      const response = await fetch(LINK + BreadProfiles, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(profil),
      });

      if (!response.ok) {
        showErrorState();
        setErrorState("not ok");
      }
    } catch (error) {
      showErrorState();
      setErrorState("server didn't respond!");
    }

    fetchData();
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
