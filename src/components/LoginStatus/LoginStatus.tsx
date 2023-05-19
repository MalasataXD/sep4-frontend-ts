import { LoginStatus_Login, LoginStatus_Profil, JWTLocation } from "../config";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode"; //64 base

import styles from "./LoginStatus.module.css";
import userIcon from "../../img/icons/user.png";

export default function LoginStaus() {
  if (isLoggedIn()) {
    return (
      <Link to={`${LoginStatus_Profil}`}>
        <div className={styles.ProfileSection}>
          <img
            className={`${styles.icon} ${styles.ProfileImg}`}
            src={userIcon}
            alt="profile picture"
          />
          <p>Profile</p>
        </div>
      </Link>
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

  // Check if user is logged in and token has not expired
  function isLoggedIn() {
    const token = localStorage?.getItem(JWTLocation);
    return token !== null && !isTokenExpired(token);
  }

  function isTokenExpired(token: string) {
    const decoded: any = jwt_decode(token);

    // If the 'exp' field does not exist, assume the token does not expire
    if (decoded?.exp == null) {
      return false;
    }

    const now: number = Date.now() / 1000;
    return decoded.exp < now;
  }
}
