import { getContent } from "../data/content.js";
import SectionHeader from "../components/SectionHeader.jsx";
import SubSection from "../components/SubSection.jsx";
import Card from "../components/Card.jsx";

function ProjectsPage({ lang }) {
  const DATA = getContent(lang);
  const t = DATA.ui.projectsPage;
  return (
    <div style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader
        title={t.title}
        subtitle={t.subtitle}
        accent="#bdd1b8"
      />

      {/* Ordine: il web development apre la pagina, la data analysis chiude.
          Riflette il posizionamento del CV, non la cronologia dei progetti. */}
      <SubSection title={t.web} color="#bdd1b8">
        {DATA.projects.web.map((p, i) => (
          <Card key={p.title} {...p} delay={i * 80} />
        ))}
      </SubSection>

      <SubSection title={t.cyber} color="#bdd1b8">
        {DATA.projects.cyber.map((p, i) => (
          <Card key={p.title} {...p} delay={i * 80} />
        ))}
      </SubSection>

      <SubSection title={t.data} color="#bdd1b8">
        {DATA.projects.data.map((p, i) => (
          <Card key={p.title} {...p} delay={i * 80} />
        ))}
      </SubSection>
    </div>
  );
}

export default ProjectsPage;
