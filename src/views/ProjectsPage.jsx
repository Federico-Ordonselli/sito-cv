import { getContent } from "../data/content.js";
import SectionHeader from "../components/SectionHeader.jsx";
import SubSection from "../components/SubSection.jsx";
import Card from "../components/Card.jsx";

function ProjectsPage({ lang }) {
  const DATA = getContent(lang);
  const t = DATA.ui.projectsPage;
  return (
    <div className="inner-page wrap">
      <SectionHeader
        title={t.title}
        subtitle={t.subtitle}
        number="01"
      />

      {/* Ordine: il web development apre la pagina, la data analysis chiude.
          Riflette il posizionamento del CV, non la cronologia dei progetti. */}
      <SubSection title={t.web} index="01">
        {DATA.projects.web.map((p, i) => (
          <Card key={p.title} {...p} delay={i * 80} />
        ))}
      </SubSection>

      <SubSection title={t.cyber} index="02">
        {DATA.projects.cyber.map((p, i) => (
          <Card key={p.title} {...p} delay={i * 80} />
        ))}
      </SubSection>

      <SubSection title={t.data} index="03">
        {DATA.projects.data.map((p, i) => (
          <Card key={p.title} {...p} delay={i * 80} />
        ))}
      </SubSection>
    </div>
  );
}

export default ProjectsPage;
