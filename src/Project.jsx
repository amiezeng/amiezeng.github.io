export default function Project({ title, image, link }) {
  const Card = link ? "a" : "article";
  return (
    <Card
      className="project-card"
      {...(link ? { href: link, target: "_blank", rel: "noopener noreferrer", "aria-label": `${title} (opens in a new tab)` } : {})}
    >
      <div className="project-image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-label="Project image placeholder">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8" cy="8" r="2" />
            <path d="m3 17 5-5 4 4 4-6 5 7" />
          </svg>
        )}
      </div>
      <div className="project-caption">
        <h3>{title}</h3>
      </div>
    </Card>
  );
}
