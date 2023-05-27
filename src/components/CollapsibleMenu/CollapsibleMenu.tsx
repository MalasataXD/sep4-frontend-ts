import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";
import { CollapsibleMenuItems, MenuItem } from "../config";
import styles from "./CollapsibleMenu.module.css";

export default function CollapsibleMenu() {
  const [showMenu, setShowMenu] = useState(false);

  function toggleShowMenu(show: boolean) {
    setShowMenu(show);
  }

  if (showMenu) {
    return (
      <div className="dropdown">
        <Hamburger rounded color="#579BB1" onToggle={toggleShowMenu} />
        <div className={styles.dropdownContent}>
          {CollapsibleMenuItems.map((item: MenuItem) => (
            <Link key={item.name} to={item.url}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Hamburger rounded color="#579BB1" onToggle={toggleShowMenu} />
      </div>
    );
  }
}
