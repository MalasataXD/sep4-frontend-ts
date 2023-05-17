import styles from "./LivePage.module.css";
import LiveStats from "../../components/LiveValue/LiveValue";
import EditValues from "../../components/EditValues/EditValues";
import LiveGraph from "../../components/LiveGraph/LiveGraph";

export default function LivePage() {
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
