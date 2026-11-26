import { useId, useState } from "react";
import ExperiencePopup from "./ExperiencePopup";

export default function Experience({ company, date, position, image, description }) {
  const popupId = useId();
  const [open, setOpen] = useState(false);
  return (
    <article
      className={`experience${open ? " experience-open" : ""}`}
      tabIndex={0}
      aria-describedby={open ? popupId : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen(true)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <div className="experience-image">
        {image ? (
          <img src={image} alt={`${company} logo`} />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-label="Company image placeholder">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8" cy="8" r="2" />
            <path d="m3 17 5-5 4 4 4-6 5 7" />
          </svg>
        )}
      </div>
      <div className="experience-details">
        <div className="experience-heading">
          <h3>{company}</h3>
          <span className="experience-date">{date}</span>
        </div>
        <p>{position}</p>
      </div>
      {open && (
        <ExperiencePopup
          id={popupId}
          description={description || "Add a brief description of your work in this role."}
        />
      )}
    </article>
  );
}
