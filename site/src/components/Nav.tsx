export default function Nav() {
  return (
    <header className="nav">
      <div className="shell nav__inner">
        <a className="nav__logo" href="index.html" aria-label="HYROX KIM 홈">
          <svg viewBox="0 0 470 92">
            <use href="#mark-compact" />
          </svg>
        </a>
        <ul className="nav__links">
          <li className="nav__hide-sm">
            <a href="program.html">하이록스 프로그램</a>
          </li>
          <li className="nav__hide-sm">
            <a href="coaching.html">1:1 코칭</a>
          </li>
          <li className="nav__hide-sm">
            <a href="#coach">소개</a>
          </li>
          <li>
            <a
              className="nav__cta"
              href="https://ig.me/m/kim.jungwon1"
              target="_blank"
              rel="noopener noreferrer"
            >
              DM 문의 · Instagram
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
