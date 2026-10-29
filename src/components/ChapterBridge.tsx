import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ChapterBridgeProps = {
  number: string;
  from: string;
  to: string;
  tone: "cream" | "coffee";
  motionPaused?: boolean;
};

export function ChapterBridge({ number, from, to, tone, motionPaused = false }: ChapterBridgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = Boolean(useReducedMotion()) || motionPaused;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleX = useTransform(scrollYProgress, [.08, .8], [0, 1]);
  const drift = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <div ref={ref} className={`chapter-bridge chapter-bridge-${tone}`}>
      <div className="page-width chapter-bridge-inner">
        <span className="chapter-bridge-number">{number}</span>
        <m.p style={reduceMotion ? undefined : { y: drift }}><span>{from}</span><b aria-hidden="true">→</b><strong>{to}</strong></m.p>
        <div className="chapter-bridge-track" aria-hidden="true"><m.span style={reduceMotion ? { scaleX: 1 } : { scaleX }} /></div>
      </div>
    </div>
  );
}
