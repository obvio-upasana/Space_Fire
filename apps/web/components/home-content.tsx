"use client";
import Link from "next/link";
import { WordReveal } from "./landing-motion";
import { Icon, Brand, ButtonLink } from "./ui";
import { OrbitArt } from "./orbit-art";

export function HomeContent() {
  return <><ScienceStory /><Workflow /><Archive /><Questions /><HomeFooter /></>;
}

function ScienceStory() {
  return <section id="science" className="landing-section science-story">
    <p className="eyebrow">WHY WE’RE BUILDING</p>
    <WordReveal text="A flame changes in space. Our understanding should follow." />
    <p className="section-copy">Decades of experiments tell us how fire behaves beyond Earth. FlameAtlas brings their findings, conditions and original sources into one place to explore.</p>
    <OrbitArt />
    <p className="mono">A DIFFERENT ENVIRONMENT. A BETTER QUESTION.</p>
  </section>;
}

function Workflow() {
  return <section id="workflow" className="landing-section editorial-workflow">
    <div><p className="eyebrow">A WAY THROUGH THE RESEARCH</p><h2>From a question<br />to a clearer view.</h2><p className="section-copy">Ask about a material, a mission or a condition. Follow the evidence. Keep what helps your research.</p></div>
    <dl className="interface-list">
      <div><dt><span>01</span><Link href="/assistant">Ask the evidence <Icon name="right" size={16} /></Link></dt><dd>Find relevant experiments and read a response with the source alongside it.</dd></div>
      <div><dt><span>02</span><Link href="/compare">Compare the conditions <Icon name="right" size={16} /></Link></dt><dd>Put two studies together. See what matches, what differs and what needs a closer look.</dd></div>
      <div><dt><span>03</span><Link href="/notes">Keep a research note <Icon name="right" size={16} /></Link></dt><dd>Save a response, keep the references and build on the next question.</dd></div>
    </dl>
  </section>;
}

function Archive() {
  const programs = [
    ["01 / SOLID MATERIALS", "BASS & BASS-II", "Material, geometry and ventilation. A closer look at how solid fuels burn and stop burning in microgravity."],
    ["02 / AT SPACECRAFT SCALE", "Saffire", "From a small sample to a larger fire. Explore what scale and an enclosed spacecraft change."],
    ["03 / IGNITION & EXTINCTION", "SoFIE", "Research into when solid fuels ignite, how flames develop and the conditions that extinguish them."],
    ["04 / FOLLOW THE SIGNAL", "FLEX & SAME", "Droplet combustion and smoke detection. Different experiments, different pieces of the fire-safety picture."],
  ];
  return <section id="programs" className="landing-section editorial-archive">
    <p className="eyebrow">THE EXPERIMENTS BEHIND THE QUESTIONS</p><h2>Different studies.<br />A shared frontier.</h2>
    <div className="program-editorial-list">{programs.map(([label,name,description]) => <Link href="/programs" key={name}><span className="mono">{label}</span><h3>{name}<Icon name="external" size={20} /></h3><p>{description}</p></Link>)}</div>
    <Link href="/sources" className="text-link">Read the original research <Icon name="right" size={16} /></Link>
  </section>;
}

function Questions() {
  const questions = [
    ["Where does the research come from?", "NASA’s Physical Sciences Informatics repository, NASA Technical Reports Server and original program publications. Every source keeps its original reference."],
    ["What can I ask?", "Start with materials, oxygen, ventilation or gravity. You can ask for a comparison, a mission-condition match or an explanation of a research finding."],
    ["Does an ISS result apply directly to the Moon?", "The environment matters. Lunar and Martian gravity, oxygen, pressure and material geometry need to be considered separately. The workspace keeps those differences in view."],
  ];
  return <section className="landing-section faq-section"><div><p className="eyebrow">BEFORE YOUR FIRST QUESTION</p><h2>Stay curious.<br />Follow the source.</h2></div><div className="faq-list">{questions.map(([question,answer]) => <details key={question}><summary>{question}<Icon name="plus" size={18} /></summary><p>{answer}</p></details>)}</div></section>;
}

function HomeFooter() {
  return <><section className="home-cta"><div className="landing-section"><p className="mono">A LITTLE MORE EVIDENCE.</p><h2>What would you<br />like to understand?</h2><ButtonLink href="/assistant">Open FlameAtlas</ButtonLink></div></section><footer className="home-footer"><div><Brand /><p>Understanding fire. Beyond Earth.</p></div><div><Link href="/sources">Original research</Link><Link href="/trust">Evidence & limits</Link><Link href="/login">Enter workspace <Icon name="external" size={14} /></Link></div><p className="mono">INDEPENDENT NASA SPACE APPS CONCEPT<br />2026</p></footer></>;
}
