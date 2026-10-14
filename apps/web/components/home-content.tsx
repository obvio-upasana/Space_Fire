"use client";
import { WordReveal } from "./landing-motion";
import { FlameArt, Icon, Brand, ButtonLink } from "./ui";
import Link from "next/link";
import { programs } from "../lib/demo";

export function HomeContent() { return <><ScienceStory /><Workflow /><Archive /><Questions /><HomeFooter /></>; }
function ScienceStory() {
  return <section id="science" className="landing-section science-layout">
    <div><p className="eyebrow">01 / A DIFFERENT KIND OF FIRE</p>
      <WordReveal text="Take away gravity. Change everything we know about a flame." />
      <p className="section-copy">On Earth, hot air rises. In microgravity, a flame follows different rules. Material, oxygen and ventilation become a story worth understanding together.</p>
      <div className="science-labels mono"><span>EARTH / BUOYANCY</span><Icon name="right" size={16} /><span>SPACE / DIFFUSION</span></div>
    </div>
    <div className="reveal-up"><FlameArt /><p className="science-caption mono">ILLUSTRATED DIFFUSION FIELD · NOT A SIMULATION</p></div>
  </section>;
}
function Workflow() {
  return <section id="workflow" className="landing-section section-divider">
    <p className="eyebrow">02 / FROM RESEARCH TO UNDERSTANDING</p><h2>A research desk.<br />With a wider view.</h2>
    <div className="workflow-grid"><div className="workflow-copy"><p className="section-copy">Bring the conditions, findings and original sources into the same conversation.</p>
      <ol>{[["01","Find your evidence","Explore programs, materials and experimental conditions."],["02","Connect the conditions","Compare like with like. Keep the limits in view."],["03","Ask a better question","Follow every insight back to its source."]].map(([n,t,d]) => <li key={n}><span className="mono">{n}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}</ol>
    </div><div className="workspace-preview reveal-up"><div className="preview-top"><span className="mono">FLAMEATLAS / EVIDENCE DESK</span><span className="status-dot" /></div><p className="preview-question">How does airflow affect<br />a flame in microgravity?</p>
      <div className="preview-step"><Icon name="check" size={14} /> Finding relevant studies <span>03 sources</span></div><div className="preview-step"><Icon name="check" size={14} /> Comparing conditions <span>02 groups</span></div>
      <div className="preview-answer"><p className="eyebrow">THE CONDITIONS MATTER.</p><p>Start with material, flow direction and oxygen. A result only makes sense alongside the conditions that produced it.</p><div className="preview-cite"><Icon name="file" size={16} /> BASS-II · NASA PSI <Icon name="external" size={14} /></div></div>
      <Link href="/assistant" className="text-link">Try the demo conversation <Icon name="right" size={16} /></Link>
    </div></div>
  </section>;
}
function Questions() {
  const questions=[
    ["Is this an official NASA product?","No. FlameAtlas is an independent NASA Space Apps concept. Original research links point to NASA sources; NASA has not endorsed this interface."],
    ["What can I explore in this demo?","Browse experiments, compare illustrative conditions, explore a mission matcher and try a scripted evidence conversation. Analysis values in the interface are synthetic demo fixtures."],
    ["Can I trace an answer to its source?","Source cards link to original NASA investigations or reports. Citations illustrate the intended workflow; demo answers are not produced by live retrieval."],
    ["Does microgravity evidence apply directly to the Moon?","No. Lunar and Martian gravity are different conditions. A useful comparison keeps gravity, oxygen, pressure, materials and geometry in view."],
  ];
  return <section className="landing-section faq-section section-divider"><div><p className="eyebrow">04 / A FEW GOOD QUESTIONS</p><h2>Keep the curiosity.<br />Know the limits.</h2><p className="section-copy">Science starts with a question.<br />Trust starts with knowing what we can answer.</p></div><div className="faq-list">{questions.map(([q,a])=><details key={q}><summary>{q}<Icon name="plus" size={18}/></summary><p>{a}</p></details>)}</div></section>;
}
function HomeFooter() {return <><section className="home-cta"><div className="landing-section"><p className="mono">YOUR NEXT QUESTION STARTS HERE.</p><h2>A little more evidence.<br />A much clearer view.</h2><ButtonLink href="/dashboard">Open your research desk</ButtonLink></div></section><footer className="home-footer"><div><Brand/><p>Understanding fire. Beyond Earth.</p></div><div><Link href="/sources">Original sources</Link><Link href="/trust">Evidence & limits</Link><Link href="/login">Enter workspace <Icon name="external" size={14}/></Link></div><p className="mono">NASA SPACE APPS CONCEPT · 2026<br/>STATIC FRONTEND DEMONSTRATION</p></footer></>;}
function Archive() {
  return <section id="programs" className="landing-section section-divider">
    <div className="archive-heading"><div><p className="eyebrow">03 / MANY EXPERIMENTS. ONE ATLAS.</p><h2>A constellation<br />of discovery.</h2></div><p className="section-copy">From a single droplet to a spacecraft-scale fire. Follow the experiments that help us ask what happens next.</p></div>
    <div className="home-program-grid">{programs.slice(0,4).map((program,index) => <Link href="/programs" className={`home-program ${program.color} reveal-up`} key={program.name}>
      <div className="row-between"><span className="mono">0{index+1} / {program.platform.toUpperCase()}</span><Icon name="external" size={18}/></div>
      <div className="program-glyph"><Icon name={index===0?"fire":index===1?"flask":index===2?"rocket":"atom"} size={56}/></div>
      <h3>{program.name}</h3><p>{program.topic}</p><span className="program-years mono">{program.years}</span>
    </Link>)}</div><Link href="/programs" className="text-link">Explore the full program map <Icon name="right" size={17}/></Link>
    <div className="archive-proof"><p className="mono">BUILT AROUND ORIGINAL EVIDENCE</p><div><span>NASA PSI</span><span>NASA NTRS</span><span>ISS RESEARCH</span><span>OPEN SCIENCE</span></div></div>
  </section>;
}
