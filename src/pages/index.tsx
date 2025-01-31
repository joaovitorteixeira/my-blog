import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import AboutMe from "@site/src/components/AboutMe";
import TechSkill from "@site/src/components/TechSkill";
import HomepageHeader from "@site/src/components/HomepageHeader";
import LatestPosts from "@site/src/components/LatestPosts";

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
        <LatestPosts />
        <TechSkill />
      </main>
    </Layout>
  );
}
