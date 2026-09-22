import Tag from "./Tag.jsx";

function Card({ title, desc, tags, link, icon }) {
  const interactive = Boolean(link) && link !== "#";
  const Root = interactive ? "a" : "div";
  const linkProps = interactive ? { href: link, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Root id={title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className={interactive ? "card card--link" : "card"} {...linkProps}>
      {icon && <div className="card-icon">{icon}</div>}
      <div className="card-heading">
        <h3>{title}</h3>
        {interactive && <span aria-hidden="true">↗</span>}
      </div>
      <p>{desc}</p>
      <div className="card-tags">{tags.map(t => <Tag key={t} label={t} />)}</div>
    </Root>
  );
}
export default Card;
