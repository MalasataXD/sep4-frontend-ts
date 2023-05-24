import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { JWTLocation } from "../../components/config";
import { Buffer } from "buffer";

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
    //if correct mail and password
    if (true) {
      const decodedToken = { username: "testuser" };

      const payload = {
        userId: 123,
        username: "john.doe",
      };

      const header = Buffer.from(JSON.stringify({ alg: "none" })).toString(
        "base64"
      );
      const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
        "base64"
      );
      const token = `${header}.${encodedPayload}.`;

      localStorage.setItem(JWTLocation, token);

      navigator("/");
    }
  }

  function register() {}
}
