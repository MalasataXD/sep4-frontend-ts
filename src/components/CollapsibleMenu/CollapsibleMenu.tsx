import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CollapsibleMenu.css";
import Hamburger from "hamburger-react";
import { LoginStatus_Profil } from "../config";

export default function CollapsibleMenu() {
  const [showMenu, setShowMenu] = useState(false);

  function toggleShowMenu(show: boolean) {
    setShowMenu(show);
  }

  if (showMenu) {
    return (
      <div className="dropdown">
        <Hamburger onToggle={toggleShowMenu} />

        <div className="dropdown-content">
          <Link to={LoginStatus_Profil}>Link 1</Link>
          <Link to={LoginStatus_Profil}>Link 2</Link>
          <Link to={LoginStatus_Profil}>Link 3</Link>
          <Link to={LoginStatus_Profil}>Link 4</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Hamburger onToggle={toggleShowMenu} />
      </div>
    );
  }
}
