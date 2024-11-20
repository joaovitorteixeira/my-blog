import Link from "@docusaurus/Link";
import styles from "./styles.module.css";


export default function AboutMe(): JSX.Element {
  return (
    <section className={styles.aboutMe}>
      <div className="container">
        <div className="row">
          <p>
            I’m a Brazilian living in Australia 🇧🇷➡️🇦🇺 and a Backend Developer!
            💻
          </p>
          <p>
            In the past few months, I’ve been challenging myself to explore
            other programming languages 🚀, and you can follow all my adventures
            in my <Link to="/blog">blog</Link>. 📚
          </p>
          <p>
            You can find my CV{" "}
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
              here
            </a>.
            📝
          </p>
        </div>
      </div>
    </section>
  );
}
