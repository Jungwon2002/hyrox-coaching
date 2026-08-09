import { ThreeDPhotoCarousel, type CarouselItem } from "@/components/ui/3d-carousel";
import { GradientShimmer, type GradientStop } from "@/components/ui/gradient-shimmer";
import { BorderBeamPanel } from "@/components/ui/border-beam-panel";

const shimmerBrand: GradientStop[] = [
  { color: "#101210", position: 0 },
  { color: "#43473f", position: 0.26 },
  { color: "#FFE100", position: 0.42 },
  { color: "#FFE100", position: 0.58 },
  { color: "#43473f", position: 0.74 },
  { color: "#101210", position: 1 },
];

const coachPhotos: CarouselItem[] = [
  {
    src: "assets/coach/coach-3-flags.jpg",
    alt: "HYROX HONG KONG 대회 현장",
    filter: "saturate(0.82) brightness(0.95)",
  },
  { src: "assets/coach/coach-4-gym.jpg", alt: "체육관 웨이트 트레이닝" },
  { src: "assets/coach/coach-5-ergo.jpg", alt: "스키에르그 훈련" },
  { src: "assets/coach/coach-1-jump.jpg", alt: "레이스 훈련 중 점프 동작" },
  { src: "assets/coach/coach-2-track.jpg?v=5", alt: "트랙 러닝 훈련" },
];

export default function Coach() {
  return (
    <section id="coach" className="coach" aria-labelledby="coach-title">
      <div className="shell">
        <p className="coach__statement reveal">
          <span className="ln">
            <GradientShimmer gradient={shimmerBrand} duration={2.2} spread={6}>
              코치를
            </GradientShimmer>{" "}
            <em className="mark">
              <i>
                <GradientShimmer gradient={shimmerBrand} duration={2.2} spread={6}>
                  소개합니다.
                </GradientShimmer>
              </i>
            </em>
          </span>
        </p>

        <div className="coach__id reveal">
          <GradientShimmer as="h2" id="coach-title" gradient={shimmerBrand} duration={2.2} spread={6}>
            Coach Kim
          </GradientShimmer>
          <p className="en-sub">코치 김중원</p>
        </div>
      </div>

      <div className="coach__carousel reveal">
        <ThreeDPhotoCarousel items={coachPhotos} />
      </div>

      <div className="shell">
        <div className="coach__prose reveal">
          <p className="coach__prose-slash">
            저는 중국에서 초·중·고등학교를 졸업한 뒤, 스포츠 전공 세계 1위인
            영국 러프버러 대학교(Loughborough University)에서 스포츠 매니지먼트를
            전공하며 학사 과정을 마쳤습니다.
          </p>
          <p className="coach__prose-align">
            현재는 영국 명문 UCL(University College London)에서 경영학 석사 과정을
            공부하고 있으며, 하이록스 프로 싱글 부문에서 꾸준히 경쟁하며 월드
            챔피언십 진출을 목표로 훈련하고 있습니다.
          </p>

          <figure className="coach__cert">
            <a href="assets/coach/coach-cert.jpg" onClick={(e) => e.preventDefault()}>
              <img
                src="assets/coach/coach-cert.jpg"
                alt="HYROX Coach Certificate"
                loading="lazy"
              />
            </a>
            <figcaption className="coach__cert-cap">
              <span className="coach__cert-label">NSCA CSCS</span>
              <span className="coach__cert-desc">국제 공인 스트렝스 &amp; 컨디셔닝 전문가</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="shell">
        {/* The panel ships an opaque dark surface and its own padding as Tailwind
            utilities. Inline style beats those, so the box stays purely
            transparent glass and only the orbiting beam draws the border. */}
        <BorderBeamPanel
          className="coach__mission reveal"
          beams={2}
          /* both comets stay in the volt family — a dark second comet reads as
             a smudge rather than light on the paper-white ground */
          colors={["#FFE100", "#FFF3A0"]}
          thickness={2}
          radius={20}
          idleSpeed={30}
          hoverSpeed={190}
          glow
          style={{
            background: "transparent",
            borderColor: "transparent",
            padding: "clamp(28px, 4vw, 40px)",
            WebkitBackdropFilter: "blur(12px)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p>
            <strong>HYROX</strong>는 한국에서 빠르게 성장하고 있지만, 아직은 비교적
            새로운 스포츠입니다. 온라인에는 다양한 훈련 정보가 있지만, 체계적인
            계획 없이 접근하는 경우가 많습니다.
          </p>
          <p>
            현재 한국인들을 위한 전문적인 온라인 하이록스 코칭은 거의 없습니다.
            저는 우리나라 선수들이 더 체계적이고 효율적으로 훈련할 수 있도록
            돕고자 합니다.
          </p>
        </BorderBeamPanel>
      </div>
    </section>
  );
}
