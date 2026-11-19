"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Pause, Play, RotateCcw, Mail, Linkedin, MapPin } from "lucide-react";

const projects = [
  {
    number: "01", title: "Voice to Text Chatbot", category: "CONVERSATIONAL AI",
    description: "A voice-enabled chatbot that turns spoken input into text and generates relevant responses.",
    bullets: ["Built with Python, speech recognition and basic NLP techniques.", "Processed user input to support a more natural interaction flow.", "Focused on a simple, efficient conversational experience for real-time communication."],
    tech: ["Python", "Speech Recognition", "NLP"],
  },
  {
    number: "02", title: "Real-Time Passenger Alert System", category: "AUTOMATION Â· DATA",
    description: "A prototype exploring data analytics and workflow automation for passenger alerts.",
    bullets: ["Designed a prototype using Python scripting and workflow automation techniques.", "Used data analytics to simulate real-time passenger alerts.", "Demonstrated how automation can reduce manual monitoring."],
    tech: ["Python", "Data Analytics", "Workflow Automation"],
  },
  {
    number: "03", title: "Sales Data Analytics", category: "BUSINESS INTELLIGENCE",
    description: "Retail sales analysis to explore trends, seasonal patterns and product performance.",
    bullets: ["Analyzed retail sales data using Python and Power BI.", "Performed exploratory analysis to identify sales trends and seasonal patterns.", "Built Power BI dashboards to visualize key metrics and understand customer behavior and business performance."],
    tech: ["Python", "Power BI", "Data Analysis"],
  },
];

const tools = ["Python", "SQL", "Pandas", "NumPy", "Excel", "Matplotlib", "Power BI", "Google Workspace", "Sheets", "Docs", "Gmail", "Chrome", "Data Cleaning", "Data Transformation"];
const timeline = [
  { date: "2022 â€” 2025", title: "BBA Â· Airline and Airport Management", place: "Remo International College", detail: "Bachelor of Business Administration" },
  { date: "2020 â€” 2022", title: "ITI Diploma", place: "Kamban Private Industrial Training Institute", detail: "Industrial Training Institute" },
  { date: "2018 â€” 2020", title: "Higher Secondary", place: "Mary Immaculate Higher Secondary School", detail: "Higher Secondary education" },
];
const agents = ["Scout", "Layout", "Typeset", "Motion", "QA", "Deploy", "Copy", "Lint", "Index", "Render", "Palette", "Review"];

function Robot({ name, color }: { name: string; color: string }) {
  return <div className="robot-cursor" style={{ "--agent-color": color } as React.CSSProperties}><span className="robot-head"><i /><i /><b /></span><span className="robot-name">{name}</span><span className="robot-arrow">â†–</span></div>;
}

export default function Home() {
  const [paused, setPaused] = useState(false);
  const [agentsOn, setAgentsOn] = useState(true);
  const [booting, setBooting] = useState(true);
  const [built, setBuilt] = useState(0);
  const [tourActive, setTourActive] = useState(false);
  const animationRef = useRef<{ stop: () => void } | null>(null);
  const tourRef = useRef<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stored = localStorage.getItem("portfolio-agents");
    const forced = params.get("agents");
    const enabled = forced === "on" ? true : forced === "off" ? false : stored !== "off";
    setAgentsOn(enabled);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced && forced !== "on") setAgentsOn(false);
    const boot = window.setTimeout(() => setBooting(false), 850);
    return () => window.clearTimeout(boot);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("agents-disabled", !agentsOn);
    if (!agentsOn) {
      document.querySelectorAll<HTMLElement>("[data-build]").forEach((el) => el.classList.add("is-built"));
      setBuilt(document.querySelectorAll("[data-build]").length);
      return;
    }
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));
    const pending = new Set<HTMLElement>();
    const active = new Set<HTMLElement>();
    let stopped = false;
    let raf = 0;
    let cursorIndex = 0;
    const colors = ["#ff3b2f", "#54a8ff", "#e9c46a", "#a8d5a2", "#c5a3ff", "#ff8fc7"];
    const cursorEls = Array.from(document.querySelectorAll<HTMLElement>(".robot-cursor"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) pending.add(el);
        else if (el.classList.contains("is-built")) pending.delete(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
    nodes.forEach((node) => io.observe(node));
    const buildOne = (el: HTMLElement, cursor: HTMLElement) => {
      active.add(el);
      const rect = el.getBoundingClientRect();
      cursor.style.setProperty("--target-x", `${Math.max(12, Math.min(window.innerWidth - 80, rect.left + Math.min(rect.width * .35, 140)))}px`);
      cursor.style.setProperty("--target-y", `${Math.max(20, rect.top + Math.min(rect.height * .35, 50))}px`);
      cursor.classList.add("cursor-working");
      el.classList.add("is-building");
      window.setTimeout(() => {
        if (stopped) return;
        el.classList.remove("is-building"); el.classList.add("is-built"); active.delete(el);
        cursor.classList.remove("cursor-working"); setBuilt((n) => n + 1);
      }, 760 + (cursorIndex % 3) * 110);
    };
    const revealPassed = () => {
      nodes.forEach((el) => {
        if (!el.classList.contains("is-built") && el.getBoundingClientRect().bottom < -4) {
          el.classList.remove("is-building"); el.classList.add("is-built"); pending.delete(el); active.delete(el);
          setBuilt((n) => n + 1);
        }
      });
    };
    window.addEventListener("scroll", revealPassed, { passive: true });
    const tick = () => {
      if (stopped) return;
      if (!paused && active.size < 6 && pending.size) {
        const next = Array.from(pending).sort((a, b) => {
          const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect();
          return (ar.top + window.scrollY) - (br.top + window.scrollY);
        })[0];
        if (next) {
          pending.delete(next);
          if (!next.classList.contains("is-built")) {
            const cursor = cursorEls[cursorIndex % cursorEls.length];
            buildOne(next, cursor); cursorIndex++;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    animationRef.current = { stop: () => { stopped = true; cancelAnimationFrame(raf); io.disconnect(); } };
    return () => { stopped = true; cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("scroll", revealPassed); };
  }, [agentsOn, paused]);

  useEffect(() => {
    if (sessionStorage.getItem("portfolio-tour-ready") === "yes") {
      const waitForHero = window.setTimeout(() => startTour(), 2600);
      return () => window.clearTimeout(waitForHero);
    }
  }, []);

  useEffect(() => {
    const stopTour = () => {
      if (tourRef.current !== null) cancelAnimationFrame(tourRef.current);
      tourRef.current = null; setTourActive(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") stopTour();
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key.toLowerCase() === "t") startTour();
      if (event.key.toLowerCase() === "a") toggleAgents();
      if (event.key.toLowerCase() === "p") setPaused((v) => !v);
    };
    const onScroll = () => { if (tourRef.current !== null) stopTour(); };
    window.addEventListener("keydown", onKey); window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchstart", onScroll, { passive: true });
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("wheel", onScroll); window.removeEventListener("touchstart", onScroll); stopTour(); };
  }, []);

  function toggleAgents() {
    setAgentsOn((current) => { const next = !current; localStorage.setItem("portfolio-agents", next ? "on" : "off"); return next; });
  }
  function startTour() {
    if (sessionStorage.getItem("portfolio-tour-ready") !== "yes") {
      sessionStorage.setItem("portfolio-tour-ready", "yes");
      window.location.reload();
      return;
    }
    sessionStorage.removeItem("portfolio-tour-ready");
    if (tourRef.current !== null) cancelAnimationFrame(tourRef.current);
    setTourActive(true);
    window.scrollTo({ top: 0, behavior: "auto" });
    const started = performance.now();
    const duration = 28000;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const frame = (now: number) => {
      const p = Math.min(1, (now - started) / duration);
      const eased = p < .18 ? .5 * (p / .18) ** 2 : p > .82 ? 1 - .5 * ((1 - p) / .18) ** 2 : .5 * .18 + (p - .18) * (.5 / .64);
      window.scrollTo(0, max * eased);
      if (p < 1) tourRef.current = requestAnimationFrame(frame);
      else { tourRef.current = null; setTourActive(false); }
    };
    tourRef.current = requestAnimationFrame(frame);
  }

  return (
    <main>
      <div className={`boot-screen ${booting ? "boot-visible" : "boot-hidden"}`} aria-hidden={!booting}><div className="boot-mark">V<span>.</span></div><div className="boot-line"><i /></div><p>INITIALIZING PORTFOLIO</p></div>
      <div className="agent-layer" aria-hidden="true">{agents.slice(0, 12).map((name, i) => <Robot key={name} name={name} color={["#ff3b2f", "#54a8ff", "#e9c46a", "#a8d5a2", "#c5a3ff", "#ff8fc7"][i % 6]} />)}</div>
      <header className="site-header"><a className="brand" href="#top">V<span>.</span></a><nav><a href="#work">Work</a><a href="#stack">Stack</a><a href="#record">Record</a><a href="#about">About</a><a href="#contact">Contact</a></nav><a className="header-cta" href="https://mail.google.com/mail/?view=cm&fs=1&to=vv6739202@gmail.com" target="_blank" rel="noreferrer">LETâ€™S TALK <ArrowUpRight size={14} /></a></header>

      <section className="hero" id="top">
        <div className="hero-word" data-build="wipe">PORTFOLIO</div>
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="handwritten" data-build="type">Hello, Iâ€™m</p>
          <h1 data-build="wipe">Vishwanathan<br /><span>R.</span></h1>
          <p className="hero-role" data-build="type">GENERATIVE AI &amp; PYTHON FRESHER</p>
          <p className="hero-bio" data-build="type">Curious about intelligent applications, data and emerging technologies. Building a foundation in Python, analytics and Generative AI.</p>
          <a className="primary-button" href="#work" data-build="pop">VIEW WORK <ArrowDownRight size={17} /></a>
          <p className="based" data-build="type"><MapPin size={13} /> BASED IN THIRUVANAMALAI, TAMIL NADU</p>
        </div>
        <div className="hero-person" data-build="pop"><Image src="/headshot.png" alt="Black and white studio portrait of Vishwanathan R" fill priority sizes="(max-width: 760px) 90vw, 54vw" /></div>
        <div className="hero-stats" data-build="pop"><div><strong>03</strong><span>PROJECTS</span></div><div><strong>02</strong><span>CERTIFICATES</span></div><div><strong>03</strong><span>EDUCATION MILESTONES</span></div></div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line"><i /></span><span>01 / 05</span></div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-top"><div><p className="eyebrow" data-build="type">01 â€” SELECTED PROJECTS</p><h2 data-build="wipe">Work that <em>ships.</em></h2><p className="section-intro" data-build="type">A few ways Iâ€™ve explored Python, automation, conversational systems and data.</p></div><div className="section-metrics" data-build="pop"><div><b>03</b><span>PROJECTS</span></div><div><b>02</b><span>AI / DATA THEMES</span></div><div><b>01</b><span>COMMON THREAD: PYTHON</span></div></div></div>
        <div className="project-list">{projects.map((project) => <article className="project-card" key={project.number} data-build="pop"><div className="project-meta"><span>{project.number}</span><span>{project.category}</span></div><div className="project-main"><h3>{project.title}</h3><p className="project-desc">{project.description}</p><ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><div className="chips">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></div><span className="project-mark"><ArrowUpRight size={22} /></span></article>)}</div>
      </section>

      <section className="stack-section" id="stack"><div className="section-heading-row"><div><p className="eyebrow" data-build="type">02 â€” TOOLS &amp; TECHNOLOGIES</p><h2 data-build="wipe">My working <em>stack.</em></h2></div><p data-build="type">Tools and concepts listed in my resume.</p></div><div className="marquee-shell" data-build="wipe"><div className="marquee-track">{[...tools, ...tools].map((tool, i) => <span key={`${tool}-${i}`}>{tool}<i>âœ³</i></span>)}</div></div><p className="stack-footnote" data-build="type">ALWAYS LEARNING. ALWAYS BUILDING.</p></section>

      <section className="section record-section" id="record"><div className="section-top"><div><p className="eyebrow" data-build="type">03 â€” THE RECORD</p><h2 data-build="wipe">The path <em>so far.</em></h2><p className="section-intro" data-build="type">Education and learning milestones from my resume.</p></div><div className="record-note" data-build="type">FOUNDATIONS IN BUSINESS, AIRLINE &amp; AIRPORT MANAGEMENT, AND TECHNOLOGY.</div></div><div className="timeline">{timeline.map((item, i) => <article className="timeline-item" key={item.title} data-build="pop"><div className="timeline-date">{item.date}</div><div className="timeline-dot" /><div className="timeline-content"><h3>{item.title}</h3><p>{item.place}</p><span>{item.detail}</span></div><span className="timeline-index">0{i + 1}</span></article>)}</div><div className="cert-row" data-build="pop"><div><p className="eyebrow">CERTIFICATES &amp; LEARNING</p><h3>Learning in motion.</h3></div><div className="cert-list"><span>Data Visualization using Power BI &amp; Excel</span><span>Runway Safety</span><span>Generative AI â€” Techpanda <small>Currently pursuing</small></span></div></div></section>

      <section className="section about-section" id="about"><div className="about-head"><p className="eyebrow" data-build="type">04 â€” A LITTLE ABOUT ME</p><h2 data-build="wipe">Curiosity is<br />the <em>starting point.</em></h2></div><div className="about-body"><p data-build="type">Iâ€™m Vishwanathan, a motivated fresher with a strong interest in Generative AI and emerging technologies. I enjoy exploring how Python, data and intelligent systems can come together to solve practical problems.</p><p data-build="type">My learning so far includes data cleaning and transformation, analytics, visualization, and building simple conversational and automation prototypes. Iâ€™m eager to learn, adapt and contribute in a growth-oriented environment.</p><div className="skills-grid" data-build="pop"><div><span>01</span><b>Programming</b><p>Python Â· SQL</p></div><div><span>02</span><b>Data handling</b><p>Cleaning Â· Transformation</p></div><div><span>03</span><b>Libraries</b><p>Pandas Â· NumPy</p></div><div><span>04</span><b>Visualization</b><p>Excel Â· Matplotlib Â· Power BI</p></div><div><span>05</span><b>Tools</b><p>Google Workspace</p></div><div><span>06</span><b>Languages</b><p>Tamil Â· English</p></div></div><div className="principles" data-build="pop"><span>HOW I WORK</span><b>Problem-solving</b><b>Adaptability</b><b>Teamwork</b><b>Continuous learning</b></div></div></section>

      <section className="contact-section" id="contact"><div className="contact-card" data-build="wipe"><p className="eyebrow">05 â€” CONTACT</p><p className="handwritten">Have an idea?</p><h2>Letâ€™s make<br /><em>it useful.</em></h2><p className="contact-copy">Open to learning opportunities and conversations around Python, data and Generative AI.</p><a className="contact-button" href="https://mail.google.com/mail/?view=cm&fs=1&to=vv6739202@gmail.com" target="_blank" rel="noreferrer">GET IN TOUCH <ArrowUpRight size={18} /></a><div className="contact-orbit">V<span>.</span></div></div><div className="contact-links"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=vv6739202@gmail.com" target="_blank" rel="noreferrer"><Mail size={16} /> vv6739202@gmail.com <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/vishwanathan-r-78a9a3293" target="_blank" rel="noreferrer"><Linkedin size={16} /> LINKEDIN <ArrowUpRight size={14} /></a></div><footer><a className="brand" href="#top">V<span>.</span></a><span>Â© {new Date().getFullYear()} VISHWANATHAN R</span><a href="#top">BACK TO TOP â†‘</a></footer></section>

      <div className="dock" role="group" aria-label="Portfolio animation controls"><button onClick={() => setPaused((v) => !v)} aria-label={paused ? "Resume animation" : "Pause animation"}>{paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? "RESUME" : "PAUSE"}</span></button><button onClick={toggleAgents} aria-pressed={agentsOn}><span className={`status-dot ${agentsOn ? "on" : "off"}`} /> <span>AGENTS {agentsOn ? "ON" : "OFF"}</span></button><button onClick={startTour} aria-pressed={tourActive}><RotateCcw size={14} /><span>{tourActive ? "TOURING" : "TOUR"}</span></button><span className="dock-count">{String(built).padStart(2, "0")} BUILT</span></div>
    </main>
  );
}

