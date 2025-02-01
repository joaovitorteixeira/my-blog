import { FaAws, FaNodeJs } from "react-icons/fa";
import styles from "./styles.module.css";
import { GrMysql } from "react-icons/gr";
import { SiPrisma, SiTypescript } from "react-icons/si";
import { SiNestjs } from "react-icons/si";

function SkillSquare({ icon: Icon, name }) {
  return (
    <div className="card">
      <Icon className={styles.icon} />
      <span className="card-title">{name}</span>
    </div>
  );
}

export default function TechSkill(): JSX.Element {
  return (
    <section className={styles["tech-skills"]}>
      <div className="container">
        <h2>My Tech Skills</h2>
        <div className={`card-list ${styles["card-list"]}`}>
          <SkillSquare icon={FaNodeJs} name="Node.js" />
          <SkillSquare icon={SiTypescript} name="TypeScript" />
          <SkillSquare icon={GrMysql} name="MySQL" />
          <SkillSquare icon={SiPrisma} name="Prisma" />
          <SkillSquare icon={FaAws} name="CloudFormation (CDK)" />
          <SkillSquare icon={SiNestjs} name="NestJs" />
        </div>
      </div>
    </section>
  );
}
