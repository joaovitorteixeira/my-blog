import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function AboutMe(): JSX.Element {
  return (
    <section className={styles["about-me"]}>
      <div className="container">
        <h2 className="section-title">About me</h2>
        <div className={styles.row}>
          <p>I’m a Brazilian living in Australia 🇧🇷➡️🇦🇺!</p>
          <p>
            ❣ I'm passionate about resolving complex problems and building a
            reliable, scalable and maintainable codebase.
          </p>
          <p>🎓 I have a Bachelor’s degree in Information System.</p>
          <p>
            🚀 I have been working as a Software Engineer for the past 7 years.
          </p>
          <p>
            Download my resume{" "}
            <Link
              to="/joao-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              here.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
