import { useId, useState } from "react";

export default function Project({ title, image, link, description }) {
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const Card = link ? "a" : "article";
  return (
    <Card
      className="project-card"
      tabIndex={!link && description ? 0 : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
      aria-describedby={description && open ? descriptionId : undefined}
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
      {description && open && (
        <svg className="project-connector" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
          <polyline className="connector-side" points="0,28 12,28 12,1 100,1" fill="none" stroke="#a6a6a6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <polyline className="connector-top" points="0,28 0,1 100,1" fill="none" stroke="#a6a6a6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      {description && open && (
        <div className="project-popup" id={descriptionId} role="tooltip">
          <p>{description}</p>
        </div>
      )}
    </Card>
  );
}
