import styles from "./BreadProfilesPage.module.css";
import TargetCard from "../../components/TargetCard/TargetCard";
import SelcetedBreadProfiles from "../../components/SelcetedBreadProfiles/SelcetedBreadProfiles";
import { useState, useEffect } from "react";
import { element } from "prop-types";

export default function BreadProfilesPage() {
  const [data, setData] = useState<BreadProfile[] | null>(null);
  const [Selected, setSelected] = useState<BreadProfile | null>(null);

  const [showAdd, setshowAdd] = useState<boolean>(false);
  const [showRemove, setshowRemove] = useState<boolean>(false);
  const [showEdit, setshowEdit] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Selected:", Selected);
  }, [Selected]);

  async function fetchData(): Promise<void> {
    try {
      // # Makes a request to the API to get the latest data
      const response: Response = await fetch(
        "http://localhost:8080/data-service/bread",
        {
          headers: { "Content-Type": "application/json" },
          method: "GET",
          mode: "cors",
        }
      );
      // ! If something went wrong --> Throw an Error.
      if (!response.ok) {
        throw new Error("Could not get information from API...");
      }

      const data: BreadProfile[] = await response.json(); // # Convert from JSON to APIData Object
      // NOTE: Split the data into the correct displays.
      setData(data);
    } catch (Error) {
      console.error(Error);
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
    console.log("POST");
    console.log(profil);
    try {
      const response = await fetch("http://localhost:8080/data-service/bread", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(profil),
      });

      if (!response.ok) {
        console.log("nok ok :c");
      }
    } catch (error) {
      console.log("server didn't respond!");
    }
    fetchData();
  }

  async function DeleteProfil(profil: BreadProfile) {
    console.log("DELETE");
    console.log(profil);
    try {
      const response = await fetch(
        "http://localhost:8080/data-service/bread?id=" + profil?.id,
        {
          headers: { "Content-Type": "application/json" },
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log("nok ok :c");
      }
    } catch (error) {
      console.log("server didn't respond!");
    }
    fetchData();
  }

  async function UpdateProfil(profil: BreadProfile) {
    console.log("UPDATE");
    console.log(profil);
    try {
      const response = await fetch("http://localhost:8080/data-service/bread", {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(profil),
      });

      if (!response.ok) {
        console.log("nok ok :c");
      }
    } catch (error) {
      console.log("server didn't respond!");
    }
    fetchData();
  }
}
