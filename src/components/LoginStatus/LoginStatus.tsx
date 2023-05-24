import { LoginStatus_Login, LoginStatus_Profil } from "../config";
import Login from "../login";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

import styles from "./LoginStatus.module.css";
import userIcon from "../../img/icons/user.png";

export default function LoginStaus() {
  const [LoggedIn, setLoggedIn] = useState(Login.isLoggedIn());

  useEffect(() => {
    setLoggedIn(Login.isLoggedIn());
  }, [LoggedIn]);

  if (Login.isLoggedIn()) {
    return (
      // <Link to={"/"}>
      <div onClick={Login.logout} className={styles.ProfileSection}>
        <img
          className={`${styles.icon} ${styles.ProfileImg}`}
          src={userIcon}
          alt="profile picture"
        />
        <p>Profile</p>
      </div>
      // </Link>
    );
  } else {
    return (
      <Link to={`${LoginStatus_Login}`}>
        <button className={styles.LoginButton}>
          <img className={styles.icon} src={userIcon} alt="user icon" />
          <p>LOGIN</p>
        </button>
      </Link>
    );
  }
}
