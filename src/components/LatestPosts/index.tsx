import { useEffect, useState } from "react";
import data from "@site/.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json";
import styles from "./styles.module.css";

function SkillSquare({ title, date: dateStr, link }) {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  let mm: string | number = date.getMonth() + 1;
  let dd: string | number = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;

  return (
    <a href={link} className={`${styles.card} card`}>
      <span className="card-title">{title}</span>
      <span className={`card-title ${styles.cardDate}`}>{formattedToday}</span>
    </a>
  );
}

export default function LastPosts(): JSX.Element {
  const [latestPosts, setLatestPosts] = useState([] as typeof data.items);

  useEffect(() => {
    setLatestPosts(data.items.slice(0, 3));
  }, []);

  return (
    <section className={styles.latestPosts}>
      <h2 className="section-title">Latest Posts</h2>
      <div className="container">
        <div className={`card-list ${styles["card-list"]}`}>
          {latestPosts.map((post) => (
            <SkillSquare
              key={post.permalink}
              title={post.title}
              date={post.date}
              link={post.permalink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
