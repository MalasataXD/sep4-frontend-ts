import { Login } from "../config";
import LoginHandler from "../login";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

import styles from "./LoginStatus.module.css";
import userIcon from "../../img/icons/user.png";

export default function LoginStaus() {
  const [isLoggedIn, setIsLoggedIn] = useState(LoginHandler.isLoggedIn());

  const observer = {
    update: (data: boolean) => {
      setIsLoggedIn(data);
    },
  };

  useEffect(() => {
    LoginHandler.addObserver(observer);
    return () => {
      LoginHandler.removeObserver(observer);
    };
  }, []);

  if (isLoggedIn) {
    return (
      // <Link to={"/"}>
      <div onClick={LoginHandler.logout} className={styles.ProfileSection}>
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
      <Link to={`${Login}`}>
        <button className={styles.LoginButton}>
          <img className={styles.icon} src={userIcon} alt="user icon" />
          <p>LOGIN</p>
        </button>
      </Link>
    );
  }
}
