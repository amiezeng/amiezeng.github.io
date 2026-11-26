export default function ExperiencePopup({ id, description }) {
  return (
    <div id={id} className="experience-popup" role="tooltip">
      <p>{description}</p>
    </div>
  );
}
