import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LivePage.module.css";
import LiveStats from "../../components/LiveValue/LiveValue";
import EditValues from "../../components/EditValues/EditValues";
import LiveGraph from "../../components/LiveGraph/LiveGraph";
import Login from "../../components/login";

export default function LivePage() {
  // Assuming you have a variable to determine the user's login status

  const navigate = useNavigate();

  useEffect(() => {
    if (!Login.isLoggedIn()) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.LiveStats}>
        <LiveStats></LiveStats>
      </div>

      <div className={styles.StackedContainers}>
        <div className={styles.EditValues}>
          <EditValues></EditValues>
        </div>
        <div className={styles.Graphs}>
          <LiveGraph></LiveGraph>
        </div>
      </div>
    </div>
  );
}
