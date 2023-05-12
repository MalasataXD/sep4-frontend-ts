import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CollapsibleMenu.css";
import Hamburger from "hamburger-react";
import { LoginStatus_Profil, CollapsibleMenuItems, MenuItem } from "../config";

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
          {CollapsibleMenuItems.map((item: MenuItem) => (
            <Link to={item.url}>{item.name}</Link>
          ))}
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
