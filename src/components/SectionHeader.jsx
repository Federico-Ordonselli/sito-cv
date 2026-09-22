function SectionHeader({ title, subtitle, number }) {
  return <header className="section-header">
    <div className="section-header-top mono"><span>{number} / {subtitle}</span><span aria-hidden="true">✳</span></div>
    <h1>{title}<span aria-hidden="true">.</span></h1>
  </header>;
}
export default SectionHeader;
