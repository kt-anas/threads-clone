import Navbar from "../components/Navbar/Navbar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles['navbar-container']}>
        <Navbar />
      </div>
      <div className={styles.hello}>hello</div>
    </main>
  );
}
