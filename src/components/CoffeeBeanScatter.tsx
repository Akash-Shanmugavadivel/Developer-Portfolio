import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Bean = { x: number; y: number; size: number; angle: number; drift: number; shade?: "light" | "dark" };
type Area = "hero" | "menu" | "story" | "cloud" | "pantry";

const spills: Record<Area, Bean[]> = {
  hero: [
    { x: 3, y: 13, size: 22, angle: -28, drift: 28 },
    { x: 8, y: 18, size: 13, angle: 36, drift: -19, shade: "light" },
    { x: 2, y: 76, size: 16, angle: 62, drift: 24 },
    { x: 96, y: 17, size: 20, angle: 24, drift: -25 },
    { x: 93, y: 78, size: 14, angle: -52, drift: 20, shade: "light" },
  ],
  menu: [
    { x: 3, y: 8, size: 19, angle: 31, drift: 30 },
    { x: 96, y: 16, size: 24, angle: -39, drift: -30 },
    { x: 94, y: 19, size: 12, angle: 53, drift: 18, shade: "light" },
    { x: 4, y: 54, size: 15, angle: -58, drift: -22 },
    { x: 97, y: 67, size: 17, angle: 49, drift: 27 },
    { x: 6, y: 94, size: 12, angle: 15, drift: -17, shade: "light" },
  ],
  story: [
    { x: 4, y: 23, size: 18, angle: -34, drift: 28 },
    { x: 96, y: 19, size: 15, angle: 56, drift: -20, shade: "dark" },
    { x: 93, y: 81, size: 25, angle: -19, drift: 24 },
    { x: 5, y: 82, size: 11, angle: 41, drift: -16, shade: "light" },
  ],
  cloud: [
    { x: 3, y: 15, size: 16, angle: 39, drift: -24, shade: "light" },
    { x: 96, y: 27, size: 21, angle: -31, drift: 29, shade: "light" },
    { x: 5, y: 78, size: 23, angle: -53, drift: 25, shade: "light" },
    { x: 94, y: 82, size: 13, angle: 51, drift: -18, shade: "light" },
  ],
  pantry: [
    { x: 3, y: 12, size: 20, angle: -25, drift: 26 },
    { x: 97, y: 20, size: 15, angle: 53, drift: -22, shade: "light" },
    { x: 5, y: 68, size: 13, angle: 45, drift: -19 },
    { x: 95, y: 79, size: 22, angle: -47, drift: 29 },
  ],
};

function ScatteredBean({ bean, progress, still }: { bean: Bean; progress: MotionValue<number>; still: boolean }) {
  const y = useTransform(progress, [0, 1], [-bean.drift, bean.drift]);
  const rotate = useTransform(progress, [0, 1], [bean.angle - 13, bean.angle + 13]);

  return (
    <motion.span
      className={`scattered-bean${bean.shade ? ` scattered-bean-${bean.shade}` : ""}`}
      style={{ left: `${bean.x}%`, top: `${bean.y}%`, width: bean.size, height: bean.size * 1.38, y: still ? 0 : y, rotate: still ? bean.angle : rotate }}
    />
  );
}

export function CoffeeBeanScatter({ area }: { area: Area }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div className={`coffee-bean-scatter coffee-bean-scatter-${area}`} ref={ref} aria-hidden="true">
      {spills[area].map((bean, index) => <ScatteredBean key={index} bean={bean} progress={scrollYProgress} still={still} />)}
    </div>
  );
}
