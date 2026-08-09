function FaqTrace() {
  return (
    <span className="faq__trace" aria-hidden="true">
      <span className="faq__trace-edge faq__trace-edge--t" />
      <span className="faq__trace-edge faq__trace-edge--r" />
      <span className="faq__trace-edge faq__trace-edge--b" />
      <span className="faq__trace-edge faq__trace-edge--l" />
    </span>
  );
}

export default function Faq() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="shell--narrow">
        <div className="section-head reveal">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title">자주 묻는 질문</h2>
          <p className="en-sub">Frequently asked questions</p>
        </div>
        <div className="reveal faq__list">
          <div className="faq__row">
            <FaqTrace />
            <details>
              <summary>HYROX 장비나 시설이 부족한데도 코칭이 가능한가요?</summary>
              <p className="a">
                네. 군부대, 일반 헬스장, 또는 제한된 장비만 있는 환경에서도
                괜찮습니다. 현재 훈련 환경에 맞춰 프로그램을 설계하여 목표를
                달성할 수 있도록 도와드립니다.
              </p>
            </details>
          </div>
          <div className="faq__row">
            <FaqTrace />
            <details>
              <summary>HYROX 외에 다른 목표가 있어도 코칭을 받을 수 있나요?</summary>
              <p className="a">
                네. HYROX가 제 전문 분야이지만, 하프마라톤, 근력 향상, 그리고
                다양한 피트니스 종목까지 폭넓은 목표를 위한 코칭을 제공합니다.
                어떤 목표든 개인에게 맞춘 훈련 프로그램으로 목표 달성을
                도와드립니다.
              </p>
            </details>
          </div>
          <div className="faq__row">
            <FaqTrace />
            <details>
              <summary>HYROX가 처음인데 코칭을 받을 수 있나요?</summary>
              <p className="a">
                물론입니다. 제 코칭은 HYROX를 처음 시작하는 분부터 경험이
                풍부한 선수까지, 모든 수준의 선수들을 위해 설계되었습니다.
              </p>
            </details>
          </div>
          <div className="faq__row">
            <FaqTrace />
            <details>
              <summary>코칭은 얼마나 진행되나요?</summary>
              <p className="a">
                코칭은 월 단위로 진행되며, 최소 등록 기간은 4주입니다. 이후에는
                목표와 일정에 맞춰 유연하게 코칭 기간을 이어갈 수 있습니다.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
