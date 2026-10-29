import { useEffect, useState } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CafeCompanion } from "@/components/CafeCompanion";
import { CoffeeBeanScatter } from "@/components/CoffeeBeanScatter";
import { ChapterBridge } from "@/components/ChapterBridge";
import TerminalContact from "@/components/TerminalContact";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  BrainCircuit,
  Braces,
  Cloud,
  CloudCog,
  Code2,
  Coffee,
  Database,
  Download,
  FlaskConical,
  Github,
  Leaf,
  Link2,
  Linkedin,
  Mail,
  Menu,
  Network,
  BookOpen,
  ChartNoAxesCombined,
  Boxes,
  Pause,
  Play,
  Moon,
  Sun,
  X,
} from "lucide-react";

const githubUrl = "https://github.com/Akash-Shanmugavadivel";
const linkedinUrl = "https://www.linkedin.com/in/akash-shanmugavadivel";
const email = "akashkumaran15@gmail.com";

// Update this single item when a new project or engineering note is ready to feature.
const currentBuild = {
  type: "PROJECT / AI SAFETY",
  title: "Safer prompts, fewer leaked secrets.",
  description: "Building prompt-leaks, a Python and FastAPI guardrail that detects and redacts secrets before they reach an AI model.",
  linkLabel: "Explore prompt-leaks",
  href: "https://github.com/Akash-Shanmugavadivel/prompt-leaks",
};

const skills = [
  { label: "Backend", icon: Code2, tools: [{ name: "Java", icon: Coffee }, { name: "Spring Boot", icon: Leaf }, { name: "REST APIs", icon: Network }, { name: "API testing", icon: FlaskConical }] },
  { label: "Cloud", icon: CloudCog, tools: [{ name: "AWS", icon: Cloud }, { name: "Azure", icon: CloudCog }, { name: "GCP", icon: Cloud }, { name: "Terraform", icon: Boxes }, { name: "FinOps", icon: ChartNoAxesCombined }] },
  { label: "AI & data", icon: BrainCircuit, tools: [{ name: "Python", icon: Braces }, { name: "RAG", icon: BookOpen }, { name: "LangChain", icon: Link2 }, { name: "SQL", icon: Database }, { name: "MongoDB", icon: Leaf }] },
];

const brewMenu = [
  { name: "Java", brew: "Espresso", note: "The strong base: clear object-oriented code and dependable backend logic.", icon: Coffee },
  { name: "Spring Boot", brew: "Cappuccino", note: "A layered blend of REST APIs, validation, services, and persistence.", icon: Leaf },
  { name: "Docker", brew: "Cold Brew", note: "Packaging applications into repeatable environments.", icon: Boxes },
  { name: "AWS", brew: "Latte", note: "Cloud services, governance checks, and practical automation.", icon: Cloud },
];

const repositories = [
  {
    number: "01",
    category: "JAVA / BACKEND",
    title: "Student Management API",
    description: "A Spring Boot CRUD foundation with student endpoints, service and repository layers, and JPA persistence.",
    stack: "Java · Spring Boot · JPA",
    href: "https://github.com/Akash-Shanmugavadivel/Student-Management-API",
  },
  {
    number: "02",
    category: "JAVA / DESKTOP",
    title: "Interactive Learning Platform",
    description: "A Swing language learning app with lessons, quizzes, daily streaks, and progress stored in MySQL.",
    stack: "Java · Swing · JDBC · MySQL",
    href: "https://github.com/Akash-Shanmugavadivel/Interactive-Learning-Platform",
  },
  {
    number: "03",
    category: "PYTHON / AI SAFETY",
    title: "prompt-leaks",
    description: "A Python library and FastAPI service that detects and redacts secrets before prompts are sent to an AI model.",
    stack: "Python · FastAPI · Secret detection",
    href: "https://github.com/Akash-Shanmugavadivel/prompt-leaks",
  },
  {
    number: "04",
    category: "AI / PRODUCT",
    title: "LingoFlow AI",
    description: "A German conversation coach with scenario practice, contextual corrections, translation, and session summaries.",
    stack: "Next.js · TypeScript · Gemini",
    href: "https://github.com/Akash-Shanmugavadivel/LingoFlow-AI",
  },
];

function CoffeeIllustration() {
  return (
    <div className="coffee-scene" aria-hidden="true">
      <div className="scene-grain" />
      <div className="scene-stamp scene-stamp-top">FRESH IDEAS<br />DAILY</div>
      <div className="scene-orbit scene-orbit-one" />
      <div className="scene-orbit scene-orbit-two" />
      <span className="steam steam-one">~</span>
      <span className="steam steam-two">~</span>
      <span className="steam steam-three">~</span>
      <div className="cup-wrap">
        <div className="cup-handle" />
        <div className="cup"><div className="cup-rim" /><div className="cup-mark">{`{ java }`}</div><div className="cup-shine" /></div>
        <div className="saucer" />
      </div>
      <div className="scene-code scene-code-one">System.out.println(<span>"hello"</span>);</div>
      <div className="scene-code scene-code-two"><Cloud size={15} /> cloud + code</div>
      <div className="scene-stamp scene-stamp-bottom">BREWED WITH<br />PURPOSE ↗</div>
    </div>
  );
}

function ApiVisual() {
  return (
    <div className="menu-visual api-visual" aria-hidden="true">
      <div className="visual-label"><span>ORDER #01</span><span>JAVA / SPRING BOOT</span></div>
      <div className="api-panel"><div className="panel-bar"><i /><i /><i /><span>products.api</span></div><div className="route"><b>GET</b><span>/api/products</span><small>200</small></div><div className="route"><b>POST</b><span>/api/products</span><small>201</small></div><div className="route"><b>PUT</b><span>/api/products/:id</span><small>200</small></div></div>
      <div className="visual-corner">CRUD<br />DONE<br />RIGHT.</div>
    </div>
  );
}

function AssistantVisual() {
  return (
    <div className="menu-visual assistant-visual" aria-hidden="true">
      <div className="visual-label"><span>ORDER #02</span><span>PYTHON / RAG</span></div>
      <div className="chat-panel"><div className="chat-question"><span>YOU</span>Why does this function fail?</div><div className="chat-answer"><span>ASSISTANT ✳</span>Let&apos;s trace the input and find the first mismatch…</div><div className="chat-context">↳ context from code + learning material</div></div>
      <div className="visual-corner visual-corner-light">DEBUG<br />WITH<br />CONTEXT.</div>
    </div>
  );
}

function readMotionPreference() {
  try { return window.localStorage.getItem("java-cafe-motion-paused") === "true"; }
  catch { return false; }
}

function readThemePreference(): "morning" | "midnight" {
  try { return window.localStorage.getItem("java-cafe-theme") === "midnight" ? "midnight" : "morning"; }
  catch { return "morning"; }
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(readMotionPreference);
  const [theme, setTheme] = useState(readThemePreference);
  const [selectedBrew, setSelectedBrew] = useState(0);
  const closeMenu = () => setMenuOpen(false);
  const reduceMotion = useReducedMotion();
  const motionOff = Boolean(reduceMotion) || motionPaused;
  const { scrollY, scrollYProgress } = useScroll();
  const heroDrift = useTransform(scrollY, [0, 720], [0, 90]);
  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused-document", motionOff);
    return () => document.documentElement.classList.remove("motion-paused-document");
  }, [motionOff]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  const toggleMotion = () => {
    const next = !motionPaused;
    setMotionPaused(next);
    try { window.localStorage.setItem("java-cafe-motion-paused", String(next)); }
    catch { /* Keep the control usable when storage is unavailable. */ }
  };
  const toggleTheme = () => {
    const next = theme === "morning" ? "midnight" : "morning";
    setTheme(next);
    try { window.localStorage.setItem("java-cafe-theme", next); }
    catch { /* The switch still works without storage. */ }
  };
  const reveal = (delay = 0) => ({
    initial: motionOff ? false : { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: motionOff ? 0 : 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <div className={`cafe-site${motionOff ? " motion-paused" : ""}${theme === "midnight" ? " theme-midnight" : ""}`} id="top">
      <m.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="top-note"><div className="page-width">A LITTLE JAVA. A LITTLE CLOUD. A LOT OF CURIOSITY. <span>✳</span> PORTFOLIO / 2026</div></div>
      <header className="site-header"><div className="header-inner page-width">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Java Café by Akash S, back to top"><span className="brand-icon"><Coffee size={24} strokeWidth={2.2} /></span><span><strong>Java Café</strong><small>by Akash S</small></span></a>
        <nav id="main-navigation" className={menuOpen ? "navigation navigation-open" : "navigation"} aria-label="Main navigation"><a href="#work" onClick={closeMenu}>Signature Brews</a><a href="#about" onClick={closeMenu}>Meet the Barista</a><a href="#cloud" onClick={closeMenu}>Café Specials</a><a href="#process" onClick={closeMenu}>Brewing Process</a><a href="#contact" onClick={closeMenu}>Reserve a Table</a></nav>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "morning" ? "Switch to Midnight Espresso theme" : "Switch to Morning Café theme"} aria-pressed={theme === "midnight"}>{theme === "morning" ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}<span>{theme === "morning" ? "Midnight Espresso" : "Morning Café"}</span></button><button className="motion-toggle" type="button" onClick={toggleMotion} aria-pressed={motionPaused} aria-label={reduceMotion ? "Motion reduced by device settings" : motionPaused ? "Resume animations" : "Pause animations"} disabled={Boolean(reduceMotion)}>{reduceMotion ? <Pause size={15} aria-hidden="true" /> : motionPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}<span>{reduceMotion ? "Motion reduced" : motionPaused ? "Resume motion" : "Pause motion"}</span></button><a className="header-resume" href="/Akash_S_Resume.pdf" download>Get my résumé <ArrowUpRight size={15} /></a>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div></header>

      <main id="main">
        <section className="hero page-width" aria-labelledby="hero-title"><CoffeeBeanScatter area="hero" motionPaused={motionOff} /><m.div className="hero-copy" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }}><div className="eyebrow"><span className="eyebrow-star">✳</span> HELLO, I&apos;M AKASH</div><h1 id="hero-title">Good code.<br /><em>Strong coffee.</em><br />Better systems.</h1><p>I&apos;m an Associate Software Development Engineer at CoreStack. I build backend APIs, Python automation, and cloud tools that make real work easier.</p><div className="hero-actions"><a className="button button-dark" href="#work">See what&apos;s brewing <ArrowUpRight size={18} /></a><a className="hero-secondary" href={`mailto:${email}`}>Let&apos;s talk <ArrowRight size={18} /></a></div><div className="hero-footer"><span>JAVA & SPRING BOOT</span><span>PYTHON & APPLIED AI</span><span>CLOUD GOVERNANCE</span></div></m.div><m.div className="hero-visual-motion" style={motionOff ? undefined : { y: heroDrift }} initial={motionOff ? false : { opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .15, ease: [0.22, 1, 0.36, 1] }}><CoffeeIllustration /></m.div><a className="scroll-note" href="#work">SCROLL FOR THE GOOD STUFF <ArrowDown size={17} /></a></section>

        <section className="current-build page-width" aria-labelledby="current-build-title">
          <div className="current-build-status"><span className="current-build-spark" aria-hidden="true">✳</span><span>ON THE WORKBENCH</span><span className="current-build-type">{currentBuild.type}</span></div>
          <div className="current-build-content"><div><h2 id="current-build-title"><span>Currently building</span>{currentBuild.title}</h2><p>{currentBuild.description}</p></div><a href={currentBuild.href} target="_blank" rel="noopener noreferrer">{currentBuild.linkLabel} <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        </section>

        <section className="marquee-band" aria-label="What I work on"><div className="page-width marquee-inner"><span>BUILD IT WELL</span><span>✳</span><span>MAKE IT USEFUL</span><span>✳</span><span>KEEP LEARNING</span><span>✳</span><span>REPEAT</span></div></section>

        <section id="work" className="section menu-section page-width" aria-labelledby="work-title"><CoffeeBeanScatter area="menu" motionPaused={motionOff} /><m.div className="section-header" {...reveal()}><div><div className="section-label">01 / SIGNATURE BREWS</div><h2 id="work-title">A few things<br /><em>I&apos;ve brewed.</em></h2></div><p>Projects with a real problem behind them. Here&apos;s what I built, how I built it, and why it matters.</p></m.div><div className="project-grid">
          <m.article className="menu-card" {...reveal(0.08)}><ApiVisual /><div className="menu-card-content"><div className="card-overline"><span>BACKEND SPECIAL</span><span>01 / 02</span></div><h3>MIT Canteen<br />Product API</h3><p>Canteen product updates needed a dependable API. I built validated CRUD endpoints, clear HTTP responses, and a layered Spring Boot architecture.</p><div className="card-detail"><span className="detail-icon"><Check size={17} /></span><span>Documented with Swagger and backed by Spring Data JPA.</span></div><div className="tech-tags"><span>Java</span><span>Spring Boot</span><span>JPA</span><span>Swagger</span></div><div className="recipe-architecture"><span>HOW IT WORKS</span><p>Client → Controller → Service → JPA → Database</p></div><a className="project-repo-link" href="https://github.com/Akash-Shanmugavadivel/Student-Management-API" target="_blank" rel="noopener noreferrer">See a related Spring Boot API <ArrowUpRight size={16} /></a></div></m.article>
          <m.article id="project-python" className="menu-card" {...reveal(0.08)}><AssistantVisual /><div className="menu-card-content"><div className="card-overline"><span>AI SPECIAL</span><span>02 / 02</span></div><h3>Python Learning &<br />Debugging Assistant</h3><p>Learners get stuck when debugging advice lacks context. This RAG tutor analyzes code, retrieves relevant material, and offers hints for the problem at hand.</p><div className="card-detail"><span className="detail-icon"><Check size={17} /></span><span>Reduced debugging time by 40% in the project work.</span></div><div className="publication-note">IEEE CONFERENCE PUBLICATION · 2026</div><div className="tech-tags"><span>Python</span><span>Streamlit</span><span>LangChain</span><span>Azure OpenAI</span></div><div className="recipe-architecture"><span>HOW IT WORKS</span><p>Code input → Retrieval → Contextual hints → Learner feedback</p></div><div className="project-links"><a className="project-repo-link" href="https://github.com/logarathansv/PyDebugger---LLM-RAG-Integrated-Learning-Platform" target="_blank" rel="noopener noreferrer">View project repository <ArrowUpRight size={16} /></a><a className="project-repo-link" href="https://doi.org/10.1109/I5CPS67958.2026.11452379" target="_blank" rel="noopener noreferrer">Read the IEEE paper <ArrowUpRight size={16} /></a></div></div></m.article>
        </div><m.div className="github-shelf" {...reveal()}><div className="shelf-heading"><div><span className="section-label">ALSO ON GITHUB</span><h3>More from the shelf.</h3></div><p>Working code from other corners of my toolkit.</p></div><div className="repository-grid">{repositories.map((repo) => <a className="repository-card" href={repo.href} target="_blank" rel="noopener noreferrer" key={repo.title}><div className="repository-top"><span>{repo.category}</span><span>{repo.number} / 04</span></div><h4>{repo.title}</h4><p>{repo.description}</p><div className="repository-bottom"><span>{repo.stack}</span><ArrowUpRight size={18} /></div></a>)}</div></m.div><div className="menu-end"><span>WANT TO SEE EVERYTHING?</span><a href={githubUrl} target="_blank" rel="noopener noreferrer">Browse my GitHub <ArrowUpRight size={16} /></a></div></section>

        <ChapterBridge motionPaused={motionOff} number="01 → 02" from="WHAT I BUILD" to="WHY I BUILD" tone="cream" />

        <section id="about" className="story-section" aria-labelledby="about-title"><CoffeeBeanScatter area="story" motionPaused={motionOff} /><div className="page-width story-layout"><m.div className="story-mark" aria-hidden="true" initial={motionOff ? false : { scale: .92, rotate: -5 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}><span className="story-mark-ring">CODE / COFFEE / CURIOSITY</span><Coffee size={96} strokeWidth={1.1} /><span className="story-mark-small">EST. IN CURIOSITY</span></m.div><m.div className="story-copy" initial={motionOff ? false : { y: 18 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8 }}><div className="section-label">02 / MEET THE BARISTA</div><h2 id="about-title">Curious by nature.<br /><em>Practical by design.</em></h2><p>I graduated in Computer Science and Engineering from Madras Institute of Technology, Anna University. What keeps me interested is the moment a messy technical problem becomes a simple, useful system.</p><p>At MIT, I also served as a class representative and NSS volunteer. Those experiences shaped how I work with people as much as how I work with code.</p><div className="story-signoff"><span className="signoff-line" /><span>AKASH S · SOFTWARE DEVELOPMENT ENGINEER</span></div></m.div></div></section>

        <ChapterBridge motionPaused={motionOff} number="02 → 03" from="CURIOSITY" to="CLOUD IMPACT" tone="coffee" />

        <section id="cloud" className="cloud-section" aria-labelledby="cloud-title"><CoffeeBeanScatter area="cloud" motionPaused={motionOff} /><div className="page-width cloud-layout"><m.div className="cloud-intro" initial={motionOff ? false : { y: 18 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8 }}><div className="section-label">03 / CAFÉ SPECIALS</div><div className="cloud-badge"><Cloud size={23} /> NOW BREWING AT CORESTACK</div><h2 id="cloud-title">A little cloud.<br /><em>A lot of purpose.</em></h2><div className="role-timeline"><strong>Associate Software Development Engineer</strong><span>Aug 2026 — Present</span><strong>Trainee Engineer</strong><span>Feb 2026 — Aug 2026</span></div><p>My CoreStack work spans cloud governance, right sizing automation, and cost reporting across major cloud platforms.</p><div className="cloud-stack">AWS <span>·</span> AZURE <span>·</span> GCP <span>·</span> TERRAFORM <span>·</span> PYTHON</div></m.div><m.div className="cloud-receipt" initial={motionOff ? false : { y: 26, rotate: 1 }} whileInView={{ y: 0, rotate: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .9, delay: .12 }}><div className="receipt-top"><span>CORESTACK / SELECTED WORK</span><span>2026</span></div><div className="receipt-item"><span>01</span><div><strong>Policy checks</strong><p>Terraform scanner rules that flag cloud configuration violations.</p></div></div><div className="receipt-item"><span>02</span><div><strong>Smarter sizing</strong><p>Python automation for Amazon RDS and OpenSearch recommendations.</p></div></div><div className="receipt-item"><span>03</span><div><strong>Clearer reporting</strong><p>AI usage cost visibility and recurring GreenOps reports.</p></div></div><div className="receipt-bottom">GOOD SYSTEMS MAKE GOOD DECISIONS POSSIBLE. <span>✳</span></div></m.div></div></section>

        <section id="skills" className="section pantry-section page-width" aria-labelledby="skills-title"><CoffeeBeanScatter area="pantry" motionPaused={motionOff} /><div className="section-header pantry-header"><div><div className="section-label">04 / OUR COFFEE MENU</div><h2 id="skills-title">What I build with.</h2></div><p>A small selection of the tools I reach for most often.</p></div><div className="brew-menu" role="group" aria-label="Coffee-inspired skills">{brewMenu.map((item, index) => { const BrewIcon = item.icon; return <button className={`brew-option${selectedBrew === index ? " brew-option-active" : ""}`} type="button" aria-pressed={selectedBrew === index} onClick={() => setSelectedBrew(index)} key={item.name}><BrewIcon size={22} aria-hidden="true" /><span>{item.brew}</span><small>{item.name}</small></button>; })}</div><div className="brew-tasting" aria-live="polite"><span>BARISTA NOTE / {brewMenu[selectedBrew].brew.toUpperCase()}</span><p>{brewMenu[selectedBrew].note}</p></div><div className="skill-list">{skills.map((skill, index) => { const CategoryIcon = skill.icon; return <div className="skill-row" key={skill.label}><span className="skill-number">0{index + 1}</span><span className="skill-heading"><span className="skill-category-icon"><CategoryIcon size={21} strokeWidth={1.8} /></span><strong>{skill.label}</strong></span><div className="skill-tools">{skill.tools.map((tool) => { const ToolIcon = tool.icon; return <span className="skill-tool" key={tool.name}><ToolIcon size={14} strokeWidth={1.8} aria-hidden="true" />{tool.name}</span>; })}</div></div>; })}</div></section>

        <section id="process" className="process-section" aria-labelledby="process-title"><div className="page-width"><div className="section-label">05 / BREWING PROCESS</div><h2 id="process-title">From the first idea<br /><em>to the final pour.</em></h2><p className="process-intro">I like to make the problem clear, keep the architecture understandable, and leave room to learn from real use.</p><div className="process-grid"><article><span>01 / DISCOVER</span><FlaskConical size={27} aria-hidden="true" /><h3>Understand the problem.</h3><p>Define the user need, constraints, and what success should look like.</p></article><article><span>02 / DESIGN</span><Network size={27} aria-hidden="true" /><h3>Shape the system.</h3><p>Choose simple boundaries, useful data flows, and the right tools for the job.</p></article><article><span>03 / DELIVER</span><Check size={27} aria-hidden="true" /><h3>Build and refine.</h3><p>Implement, review behavior, and improve the details that matter in use.</p></article></div></div></section>
        <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="page-width contact-layout"><div><div className="section-label">06 / RESERVE A TABLE</div><h2 id="contact-title">Let&apos;s make<br /><em>something useful.</em></h2><p>Have a backend problem, a cloud idea, or just a good question? My inbox is open.</p><a className="button button-light" href={`mailto:${email}?subject=Let's%20build%20something`}>Send me an email <ArrowUpRight size={18} /></a></div><div className="contact-side"><TerminalContact /><div className="contact-card"><span>FIND ME HERE</span><a href={`mailto:${email}`}><Mail size={20} /> {email} <ArrowUpRight size={16} /></a><a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github size={20} /> GitHub <ArrowUpRight size={16} /></a><a href={linkedinUrl} target="_blank" rel="noopener noreferrer"><Linkedin size={20} /> LinkedIn <ArrowUpRight size={16} /></a><a href="/Akash_S_Resume.pdf" download><Download size={20} /> Download résumé <ArrowUpRight size={16} /></a><div className="contact-card-note"><Coffee size={24} /> GOOD IDEAS START WITH A CONVERSATION.</div></div></div></div></section>
      </main>
      <CafeCompanion motionPaused={motionOff} />
      <footer className="site-footer"><div className="page-width footer-inner"><span><Coffee size={16} /> JAVA CAFÉ BY AKASH S</span><span>© {new Date().getFullYear()} · BUILT WITH CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    </div>
  );
}

export default Index;
