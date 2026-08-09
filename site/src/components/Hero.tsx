import { InteractiveHoverButtonWide } from "@/components/ui/interactive-hover-button-wide";
import { Highlight } from "@/components/ui/highlight";

export default function Hero() {
  return (
    <>
      <section className="hero-dark" aria-label="소개">
        <video
          className="hero-dark__video"
          src="assets/training.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="트레이닝 영상"
        />
        <div className="hero-dark__scrim" aria-hidden="true" />
        <div className="shell hero-dark__inner">
          <p className="hero-dark__kicker reveal">HYROX Kim 온라인 코치</p>
          <h1>
            <span className="line reveal">
              Train <em>Smarter.</em>
            </span>
            <span className="line reveal">
              Race <em>Stronger.</em>
            </span>
          </h1>
          <p className="hero-dark__kr reveal">
            훈련은 더 <em>똑똑하게.</em> 레이스는 더 <em>강하게.</em>
          </p>
        </div>
      </section>

      <section className="hero-cta" aria-label="바로가기">
        <div className="shell">
          <div className="btn-row reveal">
            <InteractiveHoverButtonWide
              text={
                <>
                  <Highlight>1:1</Highlight>온라인 코칭 신청하기
                </>
              }
              subtext="Apply for 1:1 Online Coaching"
              onClick={() => (window.location.href = "coaching.html")}
            />
            <InteractiveHoverButtonWide
              text={
                <>
                  <Highlight>무료</Highlight>하이록스 4주 프로그램
                </>
              }
              subtext="FREE HYROX 4-Week Programme"
              onClick={() => (window.location.href = "program.html")}
            />
          </div>

          <p className="hero-dark__lede reveal">
            <em>맞춤형 근거 기반 코칭</em>으로 목표 달성을 돕습니다.
          </p>
        </div>
      </section>
    </>
  );
}
