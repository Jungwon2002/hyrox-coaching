export default function Footer() {
  return (
    <footer>
      <div className="shell foot">
        <a className="foot__logo" href="index.html" aria-label="HYROX KIM 홈">
          <svg viewBox="0 0 470 126">
            <use href="#mark" />
          </svg>
        </a>
        <p className="foot__meta">
          © 2026 HYROX KIM ·{" "}
          <a href="mailto:coachkimjungwon@gmail.com">coachkimjungwon@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}
