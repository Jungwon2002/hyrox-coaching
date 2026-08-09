export default function HowCoachingWorks() {
  return (
    <section id="how-coaching" className="coaching-process" aria-labelledby="how-title">
      <div className="shell">
        <div className="section-head reveal">
          <p className="eyebrow">Process</p>
          <h2 id="how-title">코칭 진행 과정</h2>
          <p className="en-sub">How coaching works</p>
        </div>
        <div className="card-grid">
          <article className="card reveal">
            <p className="card__num">01</p>
            <h3>상담 및 평가</h3>
            <p className="en-sub">Consultation &amp; Assessment</p>
            <p>
              목표, 운동 경험, 일정, 그리고 훈련 환경을 바탕으로 현재 상태를
              분석합니다.
            </p>
            <img
              className="card__preview"
              src="assets/consult-preview.svg"
              alt="상담 신청서 예시 화면"
              loading="lazy"
            />
          </article>
          <article className="card reveal">
            <p className="card__num">02</p>
            <h3>맞춤형 프로그램</h3>
            <p className="en-sub">Personalized Programme</p>
            <p>
              매주 개인의 목표와 진행 상황에 맞춘 맞춤형 훈련 프로그램을
              제공합니다.
            </p>
            <img
              className="card__preview"
              src="assets/programme-preview.svg"
              alt="주간 훈련 프로그램 예시 화면"
              loading="lazy"
            />
          </article>
          <article className="card reveal">
            <p className="card__num">03</p>
            <h3>피드백 및 소통</h3>
            <p className="en-sub">Feedback &amp; Communication</p>
            <p>
              운동 완료 후 24시간 이내 피드백을 제공합니다. 또한 카카오톡
              또는 SNS DM을 통해 언제든 질문하고 소통할 수 있으며, 매주 1:1
              체크인 콜을 통해 진행 상황을 점검하고 훈련 계획을 지속적으로
              조정합니다.
            </p>
            <img
              className="card__preview"
              src="assets/feedback-preview.svg"
              alt="코치와의 피드백 대화 예시 화면"
              loading="lazy"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
