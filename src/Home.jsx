import "./App.css";
import profileImage from "./assets/profile.jpg";
import bannerImage from "./assets/banner.jpeg";

// Set your email address here to enable the email link.
const EMAIL_ADDRESS = "";

const PROFILE_IMAGE = profileImage;
const BANNER_IMAGE = bannerImage;

function ProfileImage({ src }) {
  return (
    <div className="profile-photo">
      {src ? (
        <img src={src} alt="Amie" />
      ) : (
        <span className="photo-placeholder" role="img" aria-label="Profile picture placeholder">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="17" r="8" />
            <path d="M8 42c0-9 7-16 16-16s16 7 16 16" />
          </svg>
        </span>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="home">
      <div className="home-banner">
        {BANNER_IMAGE && <img src={BANNER_IMAGE} alt="" />}
        <h1>Amie Zeng</h1>
      </div>
      <div className="home-content">
      <ProfileImage src={PROFILE_IMAGE} />
      <div className="home-intro">
      <section>
        <p>
          Hi there! My name is Amie, I am an undergraduate at the University of Maryland
          majoring in computer science and minoring in physics. I am interested
          in AI/ML, security, and quantum!
        </p>
      </section>
      <nav className="social-links" aria-label="Contact links">
        <a href="https://www.linkedin.com/in/amiezeng" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.8-1.52 3 0 3.57 1.98 3.57 4.55v5.22Z" />
          </svg>
        </a>
        <a href="https://github.com/amiezeng" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.09 1.15a10.74 10.74 0 0 1 5.62 0c2.14-1.45 3.08-1.15 3.08-1.15.62 1.55.23 2.7.12 2.98.72.79 1.15 1.79 1.15 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.04.76 2.1v3.09c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
          </svg>
        </a>
        <a href={EMAIL_ADDRESS ? `mailto:${EMAIL_ADDRESS}` : undefined} aria-label="Email" aria-disabled={!EMAIL_ADDRESS} title={EMAIL_ADDRESS || "Email address coming soon"}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 6 9 7 9-7" />
          </svg>
        </a>
      </nav>
      </div>
      <hr className="section-divider" />
      </div>
    </main>
  );
}
