import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CollapsibleMenu.css";
import Hamburger from "hamburger-react";

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
          <a href="#">Homepage</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
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
