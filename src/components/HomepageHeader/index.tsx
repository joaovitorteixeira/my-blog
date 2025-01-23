import clsx from "clsx";
import styles from "./styles.module.css";

export default function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <img src="img/profile.jpg" alt="João" className={styles.profileImage} />
      <div className={styles.textContent}>
        <h1 className={styles.introText}>
          Hello 👋 My name is{" "}
          <a
            href="https://youtu.be/LH1j-x3D85E?si=pYwKLut1RnYfoVqE&t=18"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nameLink}
          >
            João
          </a>
        </h1>
      </div>
    </header>
  );
}
