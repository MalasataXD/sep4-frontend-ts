import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { LandingPage } from "../../components/config";
import Login from "../../components/login";

export default function LoginPage() {
  const navigator = useNavigate();

  return (
    <div className={styles.container}>
      <h3>Email:</h3>
      <input></input>

      <h3>Password:</h3>
      <input></input>

      <div className={styles.buttons}>
        <button onClick={login} className={styles.button}>
          LOGIN
        </button>

        <button className={styles.button}>REGISTER</button>
      </div>
    </div>
  );

  function login() {
    Login.login();
    navigator(LandingPage);
  }

  function register() {}
}
