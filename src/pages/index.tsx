import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import AboutMe from "@site/src/components/AboutMe";
import TechSkill from "@site/src/components/TechSkill";


function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <img src="img/profile.jpg" alt="João" className={styles.profileImage} />
      <div className={styles.textContent}>
        <p className={styles.introText}>
          Hello 👋 My name is{" "}
          <a
            href="https://youtu.be/LH1j-x3D85E?si=pYwKLut1RnYfoVqE&t=18"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nameLink}
          >
            João
          </a>
        </p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <AboutMe />
        <TechSkill />
      </main>
    </Layout>
  );
}
