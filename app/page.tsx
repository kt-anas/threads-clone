 
import Navbar from "./components/Navbar/Navbar";
import styles from "./page.module.css";
export default function Home() {
  return (
    <main className={styles.main}>
        <Navbar/>
      <div>home</div>
    </main>
  );
}
