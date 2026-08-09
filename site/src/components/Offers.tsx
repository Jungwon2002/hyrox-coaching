export default function Offers() {
  return (
    <section id="offers" className="offers" aria-labelledby="offers-title">
      <div className="shell">
        <div className="section-head reveal">
          <p className="eyebrow">Programmes</p>
          <h2 id="offers-title">두 가지 방법</h2>
          <p className="en-sub">Two ways to train with me</p>
        </div>
        <div className="offer-grid">
          <article className="offer reveal">
            <p className="offer__badge">Self-Guided</p>
            <h3>4-Week Programme</h3>
            <p className="kr-sub">하이록스 4주 프로그램</p>
            <p>
              레이스를 앞둔 4주, 검증된 구조로 훈련하세요. 주 5회 세션이
              담긴 완성형 트레이닝 플랜입니다.
            </p>
            <ul>
              <li>주 5회 · 4주간 총 20세션 상세 플랜</li>
              <li>스테이션별 테크닉 가이드</li>
              <li>레이스 페이싱 전략 시트</li>
            </ul>
            <a className="btn btn--volt" href="program.html">
              <strong>프로그램 보기</strong>
              <span>View Programme</span>
            </a>
          </article>
          <article className="offer reveal">
            <p className="offer__badge">Premium</p>
            <h3>1:1 Online Coaching</h3>
            <p className="kr-sub">1:1 온라인 코칭</p>
            <p>
              당신만을 위한 프로그램. 매주 피드백과 조정으로 목표 기록까지
              함께 갑니다.
            </p>
            <ul>
              <li>개인 맞춤 주간 프로그램</li>
              <li>주간 체크인 &amp; 영상 피드백</li>
              <li>레이스 전략 · 대회 당일 플랜</li>
            </ul>
            <a className="btn btn--volt" href="coaching.html">
              <strong>코칭 신청하기</strong>
              <span>Apply for Coaching</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
