function SubSection({ title, children, index }) {
  return (
    <section className="inner-section">
      <div className="inner-section-heading"><span className="mono">{index}</span><h2>{title}</h2><span className="inner-section-rule" /></div>
      <div className="inner-card-grid">{children}</div>
    </section>
  );
}

export default SubSection;
