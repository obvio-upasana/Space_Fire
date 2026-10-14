"use client";
import { WordReveal } from "./landing-motion";
import { FlameArt, Icon } from "./ui";
import Link from "next/link";
import { programs } from "../lib/demo";

export function HomeContent() { return <><ScienceStory /><Workflow /><Archive /></>; }
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
