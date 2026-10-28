import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

type Chapter = "top" | "work" | "about" | "cloud" | "skills" | "contact";

const chapterNotes: Record<Chapter, { message: string; link?: string; label?: string }> = {
  top: { message: "Welcome to Java Café. Take a look at what's brewing.", link: "#work", label: "Explore projects" },
  work: { message: "A project hint: the Python tutor has an IEEE paper behind it.", link: "#project-python", label: "See the project" },
  about: { message: "Curiosity and practical problem solving are the theme here." },
  cloud: { message: "These cloud projects turn usage and policy data into useful decisions." },
  skills: { message: "Java, Python, and cloud tools make a strong blend." },
  contact: { message: "Have a project in mind? Akash's inbox is open.", link: "mailto:akashkumaran15@gmail.com", label: "Say hello" },
};

function readHiddenPreference() {
  try { return window.localStorage.getItem("java-cafe-bean-hidden") === "true"; }
  catch { return false; }
}

export function CafeCompanion() {
  const [hidden, setHidden] = useState(readHiddenPreference);
  const [chatting, setChatting] = useState(false);
  const [chapter, setChapter] = useState<Chapter>("top");
  const [scrolling, setScrolling] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    let idleTimer = 0;
    const updateChapter = () => {
      const point = window.innerHeight * .43;
      const chapters: Chapter[] = ["top", "work", "about", "cloud", "skills", "contact"];
      let current: Chapter = "top";
      for (const item of chapters.slice(1)) {
        const element = document.getElementById(item);
        if (element && element.getBoundingClientRect().top <= point) current = item;
      }
      setChapter(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(() => { updateChapter(); frame = 0; });
      setScrolling(true);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setScrolling(false), 850);
    };
    updateChapter();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateChapter);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateChapter);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
    };
  }, []);

  const setHiddenPreference = (next: boolean) => {
    setHidden(next);
    setChatting(false);
    try { window.localStorage.setItem("java-cafe-bean-hidden", String(next)); }
    catch { /* The companion still works when storage is unavailable. */ }
  };

  if (hidden) {
    return <button className="bean-restore" type="button" onClick={() => setHiddenPreference(false)} aria-label="Show the coffee bean companion">☕ <span>SHOW BEAN</span></button>;
  }

  const note = chapterNotes[chapter];
  return (
    <div className={`bean-companion${reduceMotion ? " bean-still" : ""}${scrolling ? " bean-scrolling" : ""}${chatting ? " bean-chatting" : ""}${chapter === "top" ? " bean-at-top" : ""}`}>
      <div className="bean-walkway">
        <div className="bean-group">
          {chatting && (
            <motion.div className="bean-bubble" role="status" key={chapter} initial={reduceMotion ? false : { opacity: .8, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}>
              <span>{note.message}</span>
              {note.link && <a href={note.link} onClick={() => setChatting(false)}>{note.label} <ArrowUpRight size={12} /></a>}
            </motion.div>
          )}
          <button className="bean-button" type="button" onClick={() => setChatting(!chatting)} aria-label={`Coffee bean companion: ${note.message}`} aria-expanded={chatting}>
            <span className="bean-shadow" />
            <span className="bean-body"><span className="bean-seam" /><span className="bean-eyes"><i /><i /></span><span className="bean-cheeks"><i /><i /></span><span className="bean-smile" /></span>
            <span className="bean-feet"><i /><i /></span>
          </button>
          <button className="bean-dismiss" type="button" onClick={() => setHiddenPreference(true)} aria-label="Hide the coffee bean companion"><X size={12} /></button>
        </div>
      </div>
    </div>
  );
}
