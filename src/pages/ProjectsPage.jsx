import { DATA } from "../data/content.js";
import SectionHeader from "../components/SectionHeader.jsx";
import SubSection from "../components/SubSection.jsx";
import Card from "../components/Card.jsx";

function ProjectsPage() {
  return (
    <div style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader
        title="Progetti"
        subtitle="Portfolio"
        accent="#6C63FF"
      />

      <SubSection title="Data Analysis" color="#6C63FF">
        {DATA.projects.data.map((p, i) => (
          <Card key={p.title} {...p} delay={i * 80} />
        ))}
      </SubSection>

      <SubSection title="Web Development" color="#FF6584">
        {DATA.projects.web.map((p, i) => (
          <Card key={p.title} {...p} delay={i * 80} />
        ))}
      </SubSection>

      <SubSection title="Cybersecurity & Tools" color="#43B89C">
        {DATA.projects.cyber.map((p, i) => (
          <Card key={p.title} {...p} delay={i * 80} />
        ))}
      </SubSection>
    </div>
  );
}

export default ProjectsPage;
