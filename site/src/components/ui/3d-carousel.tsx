import { memo, useEffect, useLayoutEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";

type AnimationControls = ReturnType<typeof useAnimation>;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const IS_SERVER = typeof window === "undefined";

function useMediaQuery(query: string): boolean {
  const getMatches = (q: string) => (IS_SERVER ? false : window.matchMedia(q).matches);
  const [matches, setMatches] = useState(() => getMatches(query));

  useIsomorphicLayoutEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = () => setMatches(getMatches(query));
    handleChange();
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export type CarouselItem = { src: string; alt: string; filter?: string };

const transition = { duration: 0.15, ease: [0.32, 0.72, 0, 1] as const };

const Carousel = memo(function Carousel({
  controls,
  cards,
}: {
  controls: AnimationControls;
  cards: CarouselItem[];
}) {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 650 : 1100;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`);

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: "1000px", transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <motion.div
        drag="x"
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={(_, info) => rotation.set(rotation.get() + info.offset.x * 0.05)}
        onDragEnd={(_, info) =>
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
          })
        }
        animate={controls}
      >
        {cards.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
          >
            <motion.img
              src={item.src}
              alt={item.alt}
              className="aspect-[2/3] w-full rounded-xl object-cover shadow-[0_20px_44px_rgba(16,18,16,0.35)]"
              initial={{ filter: `blur(4px) ${item.filter ?? ""}`.trim() }}
              animate={{ filter: `blur(0px) ${item.filter ?? ""}`.trim() }}
              transition={transition}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
});

export function ThreeDPhotoCarousel({ items }: { items: CarouselItem[] }) {
  const controls = useAnimation();

  return (
    <div className="relative h-[224px] w-full overflow-hidden sm:h-[360px]">
      <Carousel controls={controls} cards={items} />
    </div>
  );
}
