import { DATA } from "../data/content.js";
import SectionHeader from "../components/SectionHeader.jsx";
import Card from "../components/Card.jsx";

function HobbiesPage() {
  return (
    <div style={{ padding: "60px 24px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader
        title="Hobby Tecnici"
        subtitle="Beyond Code"
        accent="#FF6584"
      />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 24,
      }}>
        {DATA.hobbies.map((h, i) => (
          <Card key={h.title} {...h} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}

export default HobbiesPage;
