import { getContent } from "../data/content.js";
import SectionHeader from "../components/SectionHeader.jsx";
import Card from "../components/Card.jsx";

function HobbiesPage({ lang }) {
  const DATA = getContent(lang);
  const t = DATA.ui.hobbiesPage;
  return (
    <div className="inner-page wrap">
      <SectionHeader
        title={t.title}
        subtitle={t.subtitle}
        number="04"
      />
      <div className="inner-card-grid hobbies-grid">
        {DATA.hobbies.map((h, i) => (
          <Card key={h.title} {...h} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}

export default HobbiesPage;
