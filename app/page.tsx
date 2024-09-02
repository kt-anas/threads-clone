import Navbar from "./ui/sidebar/Navbar";
import styles from "./page.module.scss";
 

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles['navbar-container']}>
        <Navbar />
      </div>
      <div className={styles.hello}>

        </div>
    </main>
  );
}
