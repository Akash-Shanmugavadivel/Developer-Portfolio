import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ChapterBridgeProps = {
  number: string;
  from: string;
  to: string;
  tone: "cream" | "coffee";
};

export function ChapterBridge({ number, from, to, tone }: ChapterBridgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleX = useTransform(scrollYProgress, [.08, .8], [0, 1]);
  const drift = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <div ref={ref} className={`chapter-bridge chapter-bridge-${tone}`}>
      <div className="page-width chapter-bridge-inner">
        <span className="chapter-bridge-number">{number}</span>
        <motion.p style={reduceMotion ? undefined : { y: drift }}><span>{from}</span><b aria-hidden="true">→</b><strong>{to}</strong></motion.p>
        <div className="chapter-bridge-track" aria-hidden="true"><motion.span style={reduceMotion ? { scaleX: 1 } : { scaleX }} /></div>
      </div>
    </div>
  );
}
