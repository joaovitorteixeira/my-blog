import { FaAws, FaNodeJs } from "react-icons/fa";
import styles from "./styles.module.css";
import { SiPrisma, SiTypescript } from "react-icons/si";
import { DiMysql } from "react-icons/di";

function SkillSquare({ icon: Icon, name }) {
  return (
    <div className={styles.skill}>
      <Icon className={styles.icon} />
      <span className={styles.skillName}>{name}</span>
    </div>
  );
}

export default function TechSkill(): JSX.Element {
  return (
    <section className={styles.techSkills}>
      <div className="container">
        <h2>My Tech Skills</h2>
        <div className={styles.skillList}>
          <SkillSquare icon={FaNodeJs} name="Node.js" />
          <SkillSquare icon={SiTypescript} name="TypeScript" />
          <SkillSquare icon={DiMysql} name="MySQL" />
          <SkillSquare icon={SiPrisma} name="Prisma" />
          <SkillSquare icon={FaAws} name="CloudFormation (CDK)" />
        </div>
      </div>
    </section>
  );
}
