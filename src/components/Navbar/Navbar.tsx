import styles from "./Navbar.module.css";
import LoginStaus from "../LoginStatus/LoginStatus";
import CollapsibleMenu from "../CollapsibleMenu/CollapsibleMenu";
import { Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className={styles.navbar}>
        <div className="Drop-down">
          <CollapsibleMenu />
        </div>
        <div className="logo">logo</div>
        <div className="login">
          <LoginStaus />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
