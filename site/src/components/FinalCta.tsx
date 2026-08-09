import { Highlight } from "@/components/ui/highlight";
import { GradientShimmer, type GradientStop } from "@/components/ui/gradient-shimmer";

const shimmerBrand: GradientStop[] = [
  { color: "#101210", position: 0 },
  { color: "#43473f", position: 0.26 },
  { color: "#FFE100", position: 0.42 },
  { color: "#FFE100", position: 0.58 },
  { color: "#43473f", position: 0.74 },
  { color: "#101210", position: 1 },
];

export default function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <div className="shell">
        <div className="reveal">
          <h2 id="cta-title">
            <GradientShimmer gradient={shimmerBrand} duration={2.2} spread={6}>
              다음 레이스,
            </GradientShimmer>
            <br />
            <GradientShimmer gradient={shimmerBrand} duration={2.2} spread={6}>
              지금 시작하세요
            </GradientShimmer>
          </h2>
          <GradientShimmer
            as="p"
            className="en-sub"
            gradient={shimmerBrand}
            duration={2.2}
            spread={6}
          >
            Your next race starts today
          </GradientShimmer>
        </div>
        <div className="btn-row reveal">
          <a className="btn btn--volt" href="coaching.html">
            <strong>
              <Highlight>1:1</Highlight>온라인 코칭 신청하기
            </strong>
            <span>Apply for 1:1 Online Coaching</span>
          </a>
          <a className="btn btn--ghost" href="program.html">
            <strong>
              <Highlight>무료</Highlight>하이록스 4주 프로그램
            </strong>
            <span>FREE HYROX 4-Week Programme</span>
          </a>
        </div>
      </div>
    </section>
  );
}
