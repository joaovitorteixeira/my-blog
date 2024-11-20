import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function AboutMe(): JSX.Element {
  return (
    <section className={styles.aboutMe}>
      <div className="container">
        <h2>About me</h2>
        <div className={styles.row}>
          <p>I’m a Brazilian living in Australia 🇧🇷➡️🇦🇺!</p>
          <p>
            Currently, I'm a Backend Leader at{" "}
            <Link to="https://www.moonward.com.au">Moonward Apps</Link>. 🌑
          </p>
          <p>
            In the past few months, I’ve been challenging myself to explore
            other programming languages 🤓, and you can follow all my adventures
            in my <Link to="/blog">blog</Link>. 📚
          </p>
        </div>
      </div>
    </section>
  );
}
